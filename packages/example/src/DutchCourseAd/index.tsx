import React from 'react';
import {
	AbsoluteFill,
	Sequence,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

const ORANGE = '#FF6B00';
const DARK_BLUE = '#003DA5';
const WHITE = '#FFFFFF';
const LIGHT_ORANGE = '#FF9A3E';
const CREAM = '#FFF8F0';

const features = [
	{emoji: '🎧', text: 'Audio lessons by native speakers'},
	{emoji: '📚', text: '500+ vocabulary exercises'},
	{emoji: '🏆', text: 'A1 → B2 in 6 months'},
	{emoji: '📱', text: 'Learn anytime, anywhere'},
];

function useFadeSlide(
	startFrame: number,
	direction: 'up' | 'left' = 'up',
): React.CSSProperties {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const p = spring({
		frame: frame - startFrame,
		fps,
		config: {damping: 14, mass: 0.8, stiffness: 120, overshootClamping: false},
	});
	const offset = interpolate(p, [0, 1], [direction === 'up' ? 60 : -80, 0]);
	return {
		opacity: interpolate(p, [0, 1], [0, 1]),
		transform:
			direction === 'up'
				? `translateY(${offset}px)`
				: `translateX(${offset}px)`,
	};
}

const NetherlandsFlag: React.FC = () => (
	<div
		style={{
			display: 'flex',
			flexDirection: 'column',
			width: 48,
			height: 32,
			borderRadius: 4,
			overflow: 'hidden',
			boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
			flexShrink: 0,
		}}
	>
		<div style={{flex: 1, background: '#AE1C28'}} />
		<div style={{flex: 1, background: WHITE}} />
		<div style={{flex: 1, background: DARK_BLUE}} />
	</div>
);

// Section 1: Hook (frames 0–89)
const HookSection: React.FC = () => {
	const badgeStyle = useFadeSlide(0);
	const headlineStyle = useFadeSlide(8);

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				gap: 24,
				padding: '0 56px',
			}}
		>
			<div
				style={{
					...badgeStyle,
					display: 'flex',
					alignItems: 'center',
					gap: 14,
					background: WHITE,
					borderRadius: 50,
					padding: '12px 28px',
					boxShadow: '0 4px 20px rgba(0,61,165,0.12)',
				}}
			>
				<NetherlandsFlag />
				<span
					style={{
						fontSize: 26,
						color: DARK_BLUE,
						fontWeight: 700,
						fontFamily: 'sans-serif',
						letterSpacing: 2,
					}}
				>
					DUTCH COURSE
				</span>
			</div>
			<div style={headlineStyle}>
				<p
					style={{
						fontSize: 72,
						fontWeight: 900,
						color: DARK_BLUE,
						fontFamily: 'sans-serif',
						lineHeight: 1.1,
						textAlign: 'center',
						margin: 0,
					}}
				>
					Wil je{' '}
					<span style={{color: ORANGE}}>Nederlands</span>
					{'\n'}leren?
				</p>
			</div>
			<div style={{...useFadeSlide(18)}}>
				<p
					style={{
						fontSize: 32,
						color: '#555',
						fontFamily: 'sans-serif',
						textAlign: 'center',
						margin: 0,
					}}
				>
					The #1 Dutch learning app 🇳🇱
				</p>
			</div>
		</AbsoluteFill>
	);
};

// Section 2: Features (frames 90–269, local 0–179)
const FeaturesSection: React.FC = () => {
	const titleStyle = useFadeSlide(0);

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				gap: 24,
				padding: '0 48px',
			}}
		>
			<div style={titleStyle}>
				<p
					style={{
						fontSize: 44,
						fontWeight: 800,
						color: DARK_BLUE,
						fontFamily: 'sans-serif',
						textAlign: 'center',
						margin: 0,
					}}
				>
					Why choose us?
				</p>
			</div>
			{features.map((f, i) => (
				<FeatureCard key={f.text} emoji={f.emoji} text={f.text} index={i} />
			))}
		</AbsoluteFill>
	);
};

const FeatureCard: React.FC<{emoji: string; text: string; index: number}> = ({
	emoji,
	text,
	index,
}) => {
	const style = useFadeSlide(8 + index * 14, 'left');
	return (
		<div
			style={{
				...style,
				display: 'flex',
				alignItems: 'center',
				gap: 20,
				background: WHITE,
				borderRadius: 20,
				padding: '20px 28px',
				width: '100%',
				boxShadow: '0 4px 20px rgba(0,61,165,0.12)',
				borderLeft: `5px solid ${ORANGE}`,
			}}
		>
			<span style={{fontSize: 44}}>{emoji}</span>
			<span
				style={{
					fontSize: 30,
					fontWeight: 600,
					color: DARK_BLUE,
					fontFamily: 'sans-serif',
					lineHeight: 1.3,
				}}
			>
				{text}
			</span>
		</div>
	);
};

// Section 3: CTA (frames 270–449, local 0–179)
const CtaSection: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const titleStyle = useFadeSlide(0);
	const subStyle = useFadeSlide(10);
	const btnProgress = spring({
		frame: frame - 20,
		fps,
		config: {damping: 8, stiffness: 80, mass: 0.5, overshootClamping: false},
	});
	const btnStyle: React.CSSProperties = {
		opacity: interpolate(btnProgress, [0, 1], [0, 1]),
		transform: `scale(${interpolate(btnProgress, [0, 1], [0.85, 1])})`,
	};

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				gap: 32,
				padding: '0 56px',
			}}
		>
			<div style={titleStyle}>
				<p
					style={{
						fontSize: 76,
						fontWeight: 900,
						color: WHITE,
						fontFamily: 'sans-serif',
						textAlign: 'center',
						lineHeight: 1.1,
						margin: 0,
						textShadow: '0 4px 16px rgba(0,0,0,0.25)',
					}}
				>
					Start{' '}
					<span style={{color: LIGHT_ORANGE}}>vandaag!</span>
				</p>
			</div>
			<div style={subStyle}>
				<p
					style={{
						fontSize: 34,
						color: 'rgba(255,255,255,0.9)',
						fontFamily: 'sans-serif',
						textAlign: 'center',
						margin: 0,
					}}
				>
					First 7 days free — no credit card needed
				</p>
			</div>
			<div style={btnStyle}>
				<div
					style={{
						background: LIGHT_ORANGE,
						borderRadius: 50,
						padding: '28px 72px',
						boxShadow: '0 8px 32px rgba(255,107,0,0.5)',
					}}
				>
					<span
						style={{
							fontSize: 38,
							fontWeight: 800,
							color: WHITE,
							fontFamily: 'sans-serif',
							letterSpacing: 1,
						}}
					>
						👆 SWIPE UP
					</span>
				</div>
			</div>
		</AbsoluteFill>
	);
};

export const DutchCourseAd: React.FC = () => {
	const frame = useCurrentFrame();

	const HOOK_START = 0;
	const FEATURES_START = 90;
	const CTA_START = 270;

	// Background color transitions between sections
	const bg =
		frame < FEATURES_START
			? CREAM
			: frame < CTA_START
				? '#EEF4FF'
				: DARK_BLUE;

	return (
		<AbsoluteFill style={{background: bg, overflow: 'hidden'}}>
			{/* Decorative orange arc */}
			<div
				style={{
					position: 'absolute',
					top: -220,
					left: -100,
					width: 900,
					height: 500,
					borderRadius: '50%',
					background: ORANGE,
					opacity: 0.1,
					pointerEvents: 'none',
				}}
			/>

			<Sequence from={HOOK_START} durationInFrames={FEATURES_START} layout="none">
				<AbsoluteFill>
					<HookSection />
				</AbsoluteFill>
			</Sequence>

			<Sequence from={FEATURES_START} durationInFrames={CTA_START - FEATURES_START} layout="none">
				<AbsoluteFill>
					<FeaturesSection />
				</AbsoluteFill>
			</Sequence>

			<Sequence from={CTA_START} layout="none">
				<AbsoluteFill>
					<CtaSection />
				</AbsoluteFill>
			</Sequence>

			{/* Bottom gradient bar */}
			<div
				style={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0,
					height: 8,
					background: `linear-gradient(90deg, ${ORANGE}, ${DARK_BLUE})`,
				}}
			/>
		</AbsoluteFill>
	);
};
