import React, { useEffect, useState } from 'react';
import { Box, Newline, Text, useInput, useStdin } from 'ink';
import { features } from './features.js';
import { Feature, FeatureState } from './types';
import { Icon } from './Icon.js';
import { executeShellCommand, getEnabledFeatures } from './utils/feature-utils';

function App() {
	const { isRawModeSupported } = useStdin();
	const [featureState, setFeatureState] = useState<FeatureState>(
		Object.fromEntries(features.map(f => [f.name, f.enabled]))
	);
	const [isProcessing, setIsProcessing] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedIndex, setSelectedIndex] = useState(0);

	// Load the currently enabled features on component mount
	useEffect(() => {
		const loadEnabledFeatures = async () => {
			try {
				const enabledFeatures = getEnabledFeatures();

				// Update feature state with detected features
				const newState: FeatureState = {};
				features.forEach(feature => {
					newState[feature.name] = enabledFeatures.includes(feature.name);
				});

				setFeatureState(newState);
			} catch (error) {
				console.error('Error detecting enabled features:', error);
			} finally {
				setIsLoading(false);
			}
		};

		loadEnabledFeatures();
	}, []);

	// Only use input handling if raw mode is supported
	if (isRawModeSupported) {
		useInput((input, key) => {
			// Don't process input during loading or processing
			if (isLoading || isProcessing) {
				return;
			}

			if (key.upArrow) {
				setSelectedIndex(prev => Math.max(0, prev - 1));
			}
			if (key.downArrow) {
				setSelectedIndex(prev => Math.min(features.length - 1, prev + 1));
			}
			if (input === ' ') {
				handleToggleFeature(features[selectedIndex].name);
			}
			if (key.return) {
				handleApply();
			}
			if (input === 'a') {
				handleEnableAll();
			}
			if (input === 'd') {
				handleDisableAll();
			}
			if (input === 'q') {
				process.exit();
			}
		});
	}

	const handleToggleFeature = (name: string) => {
		setFeatureState(prev => ({
			...prev,
			[name]: !prev[name]
		}));
	};

	const handleEnableAll = () => {
		setFeatureState(
			Object.fromEntries(features.map(f => [f.name, true]))
		);
	};

	const handleDisableAll = () => {
		setFeatureState(
			Object.fromEntries(features.map(f => [f.name, false]))
		);
	};

	const handleApply = async () => {
		setIsProcessing(true);

		try {
			// Get enabled feature names
			const enabledFeatureNames = Object.entries(featureState)
				.filter(([_, enabled]) => enabled)
				.map(([name]) => name);

			if (enabledFeatureNames.length === 0) {
				// If no features are enabled, run with --disable-all
				await executeShellCommand('/home/yuval/WebstormProjects/dotfiles/my.zsh --disable-all');
			} else {
				// Build command with selected features
				const featureFlags = enabledFeatureNames
					.map(feature => `--${feature}`)
					.join(' ');

				await executeShellCommand(`/home/yuval/WebstormProjects/dotfiles/my.zsh ${featureFlags}`);
			}

			console.log('Configuration applied successfully!');
		} catch (error) {
			console.error('Error applying configuration:', error);
		} finally {
			setIsProcessing(false);
		}
	};

	if (!isRawModeSupported) {
		return (
			<Box flexDirection="column" padding={1}>
				<Text color="red">Raw mode is not supported in this environment.</Text>
				<Text>Try running with `npx my-cli` in a terminal that supports raw mode.</Text>
				<Text>The current features are:</Text>
				{Object.entries(featureState)
					.filter(([_, enabled]) => enabled)
					.map(([name]) => {
						const feature = features.find(f => f.name === name);
						return (
							<Box key={name}>
								<Icon unicode={feature?.unicode || 'f00c'}/>
								<Text color="green"> {name}</Text>
							</Box>
						);
					})}
				{!Object.values(featureState).some(enabled => enabled) && (
					<Box>
						<Icon unicode="f00d"/>
						<Text> No features are currently enabled.</Text>
					</Box>
				)}
			</Box>
		);
	}

	if (isLoading) {
		return (
			<Box flexDirection="column" padding={1}>
				<Box>
					<Text color="blue">Detecting enabled features...</Text>
				</Box>
			</Box>
		);
	}

	return (
		<Box flexDirection="column" padding={1}>
			{/* Header */}
			<Box>
				<Text bold color="blue">Feature Manager</Text>
			</Box>
			<Newline/>

			{/* Current Status */}
			<Box>
				<Text>
					Currently enabled features: {' '}
					{Object.entries(featureState)
						.filter(([_, enabled]) => enabled)
						.map(([name]) => name)
						.join(', ') || 'none'}
				</Text>
			</Box>
			<Newline/>

			{/* Controls */}
			<Box>
				<Text>
					<Text bold>(A)</Text> Enable All
					<Text> | </Text>
					<Text bold>(D)</Text> Disable All
					<Text> | </Text>
					<Text bold>(Enter)</Text> Apply
					<Text> | </Text>
					<Text bold>(Q)</Text> Quit
				</Text>
			</Box>
			<Newline/>

			{/* Features List */}
			<Box flexDirection="column">
				{features.map((feature: Feature, index) => (
					<Box
						key={feature.name}
						flexDirection="row"
						padding={1}
						borderStyle={index === selectedIndex ? 'single' : undefined}
						borderColor={index === selectedIndex ? 'blue' : undefined}
					>
						<Box width={2}>
							<Text>{feature.name[0].toUpperCase()}</Text>
						</Box>
						<Box width={20}>
							<Text bold>{feature.name}</Text>
						</Box>
						<Box width={40}>
							<Text>{feature.description}</Text>
						</Box>
						<Box>
							<Text color={featureState[feature.name] ? 'green' : 'red'}>
								{featureState[feature.name] ? '✓' : '⨯'}
							</Text>
						</Box>
					</Box>
				))}
			</Box>
			<Newline/>

			{/* Footer */}
			<Box>
				<Text>
					{isProcessing ? (
						<Text color="yellow">Applying Changes...</Text>
					) : (
						<Text>Press <Text bold>Space</Text> to toggle selected feature</Text>
					)}
				</Text>
			</Box>
		</Box>
	);
}
export default () => <Text>Hello</Text>;
// export default App;
