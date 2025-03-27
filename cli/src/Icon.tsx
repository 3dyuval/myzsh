import { Text, TextProps } from 'ink';
import PropTypes from "prop-types";

export const Icon = ({ unicode, ...props }: { unicode: string } & TextProps) => (
	<Text {...props}>{String.fromCharCode(parseInt(unicode, 16))}</Text>
);
