import React from 'react';
import * as ava from 'ava';
import sinon from 'sinon';
import {render} from 'ink-testing-library';
import App from '../cli.js';
import os from 'os';
import fs from 'fs';
import path from 'path';

const test = ava.default;

// Mock fs, os and child_process modules
const fsStub = sinon.stub(fs);
const osStub = sinon.stub(os, 'homedir').returns('/mock/home');
const childProcessStub = {
  exec: sinon.stub()
};

// Mock require function to return our stubbed child_process
const originalRequire = require;
global.require = (moduleName: string) => {
  if (moduleName === 'child_process') {
    return childProcessStub;
  }
  return originalRequire(moduleName);
};

// Helper to mock symlink checks
const mockSymlinks = (enabledFeatures: string[]) => {
  // Reset stubs
  fsStub.existsSync.reset();
  fsStub.lstatSync.reset();
  fsStub.readlinkSync.reset();
  
  // Default behavior - file doesn't exist
  fsStub.existsSync.returns(false);
  
  // Create a mock stats object
  const mockStats = {
    isSymbolicLink: sinon.stub().returns(true)
  };
  fsStub.lstatSync.returns(mockStats);
  
  // Setup mock symlinks for enabled features
  enabledFeatures.forEach(feature => {
    switch(feature) {
      case 'zsh':
        fsStub.existsSync.withArgs('/mock/home/.zshrc').returns(true);
        break;
      case 'nvim': 
        fsStub.existsSync.withArgs('/mock/home/.config/nvim').returns(true);
        break;
      case 'git':
        fsStub.existsSync.withArgs('/mock/home/.gitconfig').returns(true);
        break;
      case 'starship':
        fsStub.existsSync.withArgs('/mock/home/.config/starship.toml').returns(true);
        break;
      case 'ripgrep':
        fsStub.existsSync.withArgs('/mock/home/.ripgreprc').returns(true);
        break;
      case 'bat':
        fsStub.existsSync.withArgs('/mock/home/.config/bat/config').returns(true);
        break;
      case 'misc':
        fsStub.existsSync.withArgs('/mock/home/.ctags').returns(true);
        break;
    }
  });
};

// Test setup
test.beforeEach(() => {
  // Reset all stubs
  fsStub.existsSync.reset();
  fsStub.lstatSync.reset();
  fsStub.readlinkSync.reset();
  childProcessStub.exec.reset();
  
  // Default successful exec response
  childProcessStub.exec.callsFake((cmd, callback) => {
    callback(null, 'Success', '');
  });
});

test.afterEach(() => {
  sinon.restore();
});

test('shows loading state initially', t => {
  mockSymlinks([]);
  const {lastFrame} = render(<App />);
  
  t.regex(lastFrame()!, /Detecting enabled features/);
});

test('shows correct enabled features from symlinks', async t => {
  mockSymlinks(['zsh', 'git']);
  
  const {lastFrame, waitUntilOutput} = render(<App />);
  
  // Wait for loading to finish
  await waitUntilOutput(output => !output.includes('Detecting enabled features'));
  
  // Check that the enabled features are displayed
  t.regex(lastFrame()!, /Current enabled features: zsh, git/);
});

test('toggling feature updates selected features', async t => {
  mockSymlinks(['zsh']);
  
  const {lastFrame, waitUntilOutput, stdin} = render(<App />);
  
  // Wait for loading to finish
  await waitUntilOutput(output => !output.includes('Detecting enabled features'));
  
  // Select a feature (nvim) - using space to toggle
  stdin.write(' '); // Press space to toggle feature
  
  // Verify that the UI reflects the selection
  t.regex(lastFrame()!, /✓/);
});

test('confirms selected features', async t => {
  mockSymlinks(['zsh']);
  
  const {lastFrame, waitUntilOutput, stdin} = render(<App />);
  
  // Wait for loading to finish
  await waitUntilOutput(output => !output.includes('Detecting enabled features'));
  
  // Press Enter to confirm
  stdin.write('\r');
  
  // Check that we're on confirmation screen
  t.regex(lastFrame()!, /Selected features/);
  t.regex(lastFrame()!, /zsh/);
});

test('executes shell command with correct features', async t => {
  mockSymlinks(['zsh']);
  
  const {waitUntilOutput, stdin} = render(<App />);
  
  // Wait for loading to finish
  await waitUntilOutput(output => !output.includes('Detecting enabled features'));
  
  // Press Enter to confirm
  stdin.write('\r');
  
  // Press Enter again to apply
  stdin.write('\r');
  
  // Check that the shell command was executed with correct feature
  t.true(childProcessStub.exec.calledOnce);
  const command = childProcessStub.exec.firstCall.args[0];
  t.regex(command, /--zsh/);
});

test('handles empty feature selection', async t => {
  mockSymlinks([]);
  
  const {lastFrame, waitUntilOutput, stdin} = render(<App />);
  
  // Wait for loading to finish
  await waitUntilOutput(output => !output.includes('Detecting enabled features'));
  
  // Press Enter to confirm with no features selected
  stdin.write('\r');
  
  // Check that we're on confirmation screen with "No features selected"
  t.regex(lastFrame()!, /No features selected/);
});