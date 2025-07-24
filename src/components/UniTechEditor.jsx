// THIS FILE REPLACES: src/components/UniTechEditor.jsx

import { useEffect, useRef, useState } from "react";
import * as Blockly from "blockly/core";
import "blockly/blocks";
import "blockly/javascript";
import "blockly/python";
import * as En from "blockly/msg/en";
import {
    defineCustomBlocks,
    unitechCategory,
    eventsCategory,
    displayCategory
} from "./UniTechCustomBlocks";

// Set Blockly language
Blockly.setLocale(En);

export default function UniTechEditor() {
    const blocklyDivRef = useRef(null);
    const workspaceRef = useRef(null);
    const [isConnected, setIsConnected] = useState(false);
    const [selectedKit, setSelectedKit] = useState("Basic Kit");
    const [isKitMenuOpen, setIsKitMenuOpen] = useState(false);
    const [outputText, setOutputText] = useState("// Output will appear here...");
    const [codeString, setCodeString] = useState("");
    const [currentDisplay, setCurrentDisplay] = useState("terminal"); // 'terminal', 'plot', 'data'

    // Sample data for display (replace with real data in production)
    const [sensorData, setSensorData] = useState([
        { time: '0s', temp: 22, humidity: 45, light: 230 },
        { time: '5s', temp: 23, humidity: 46, light: 235 },
        { time: '10s', temp: 24, humidity: 45, light: 240 },
        { time: '15s', temp: 25, humidity: 44, light: 245 },
        { time: '20s', temp: 24, humidity: 43, light: 250 }
    ]);

    // Available kits
    const kits = [
        "Basic Kit",
        "Advanced Kit",
        "Robotics Kit",
        "IoT Kit",
        "Data Science Kit"
    ];

    // Connect button handler
    const handleConnect = () => {
        setIsConnected(!isConnected);
        setOutputText(prev => prev + "\n> " + (isConnected ? "Disconnected" : "Connected to device"));

        // Simulate new sensor data when connected
        if (!isConnected) {
            const interval = setInterval(() => {
                setSensorData(prev => {
                    const lastEntry = prev[prev.length - 1];
                    const time = parseInt(lastEntry.time) + 5 + 's';
                    return [...prev, {
                        time,
                        temp: Math.round(lastEntry.temp + (Math.random() * 2 - 1)),
                        humidity: Math.round(lastEntry.humidity + (Math.random() * 3 - 1.5)),
                        light: Math.round(lastEntry.light + (Math.random() * 10 - 5))
                    }];
                });
            }, 5000);

            return () => clearInterval(interval);
        }
    };

    // Upload button handler
    const handleUpload = () => {
        if (!isConnected) {
            alert("Please connect to a device first!");
            return;
        }

        // Get code from Blockly
        if (workspaceRef.current) {
            const code = Blockly.JavaScript.workspaceToCode(workspaceRef.current);
            setCodeString(code);
            setOutputText(prev => prev + "\n> Uploading code to device...\n" + code.substring(0, 150) + (code.length > 150 ? "..." : ""));
        }
    };

    // Kit selection handler
    const selectKit = (kit) => {
        setSelectedKit(kit);
        setIsKitMenuOpen(false);
        setOutputText(prev => prev + "\n> Switched to " + kit);
    };

    // Initialize Blockly workspace
    useEffect(() => {
        if (!blocklyDivRef.current) return;

        // Register custom blocks
        defineCustomBlocks();

        // Define toolbox
        const toolbox = {
            kind: "categoryToolbox",
            contents: [
                eventsCategory,
                {
                    kind: "category",
                    name: "🧠 Logic",
                    colour: "#5C81A6",
                    contents: [
                        { kind: "block", type: "controls_if" },
                        { kind: "block", type: "logic_compare" },
                        { kind: "block", type: "logic_operation" },
                        { kind: "block", type: "logic_boolean" },
                        { kind: "block", type: "logic_negate" },
                        { kind: "block", type: "logic_null" },
                        { kind: "block", type: "logic_ternary" }
                    ]
                },
                {
                    kind: "category",
                    name: "🔄 Loops",
                    colour: "#5CA65C",
                    contents: [
                        { kind: "block", type: "controls_repeat_ext" },
                        { kind: "block", type: "controls_whileUntil" }
                    ]
                },
                {
                    kind: "category",
                    name: "📝 Text",
                    colour: "#5CA68D",
                    contents: [
                        { kind: "block", type: "text" },
                        { kind: "block", type: "text_print" }
                    ]
                },
                {
                    kind: "category",
                    name: "📦 Variables",
                    colour: "#A65C81",
                    custom: "VARIABLE"
                },
                {
                    kind: "category",
                    name: "⚡ Functions",
                    colour: "#9A5CA6",
                    custom: "PROCEDURE"
                },
                displayCategory,
                unitechCategory
            ]
        };

        // Custom Blockly theme with kid-friendly space colors
        const kidSpaceTheme = Blockly.Theme.defineTheme('kidSpace', {
            'base': Blockly.Themes.Classic,
            'blockStyles': {
                'logic_blocks': {
                    'colourPrimary': '#6366F1', // Indigo
                    'colourSecondary': '#818CF8',
                    'colourTertiary': '#4F46E5'
                },
                'loop_blocks': {
                    'colourPrimary': '#10B981', // Emerald
                    'colourSecondary': '#34D399',
                    'colourTertiary': '#059669'
                },
                'math_blocks': {
                    'colourPrimary': '#EC4899', // Pink
                    'colourSecondary': '#F472B6',
                    'colourTertiary': '#DB2777'
                },
                'text_blocks': {
                    'colourPrimary': '#8B5CF6', // Purple
                    'colourSecondary': '#A78BFA',
                    'colourTertiary': '#7C3AED'
                },
                'list_blocks': {
                    'colourPrimary': '#F59E0B', // Amber
                    'colourSecondary': '#FBBF24',
                    'colourTertiary': '#D97706'
                },
                'variable_blocks': {
                    'colourPrimary': '#EF4444', // Red
                    'colourSecondary': '#F87171',
                    'colourTertiary': '#DC2626'
                },
                'procedure_blocks': {
                    'colourPrimary': '#06B6D4', // Cyan
                    'colourSecondary': '#22D3EE',
                    'colourTertiary': '#0891B2'
                }
            },
            'categoryStyles': {
                'logic_category': {
                    'colour': '#6366F1'
                },
                'loops_category': {
                    'colour': '#10B981'
                },
                'math_category': {
                    'colour': '#EC4899'
                },
                'text_category': {
                    'colour': '#8B5CF6'
                },
                'lists_category': {
                    'colour': '#F59E0B'
                },
                'variables_category': {
                    'colour': '#EF4444'
                },
                'procedures_category': {
                    'colour': '#06B6D4'
                }
            },
            'componentStyles': {
                'workspaceBackgroundColour': 'transparent',
                'toolboxBackgroundColour': 'rgba(18, 24, 58, 0.9)',
                'toolboxForegroundColour': '#fff',
                'flyoutBackgroundColour': 'rgba(30, 41, 80, 0.9)',
                'flyoutForegroundColour': '#fff',
                'flyoutOpacity': 0.9,
                'scrollbarColour': '#4338ca',
                'scrollbarOpacity': 0.6,
            }
        });

        // Inject Blockly with specific configuration
        const workspace = Blockly.inject(blocklyDivRef.current, {
            toolbox: toolbox,
            trashcan: true,
            zoom: {
                controls: true,
                wheel: true,
                startScale: 1.0,
                maxScale: 3,
                minScale: 0.3,
                scaleSpeed: 1.2
            },
            grid: {
                spacing: 25,
                length: 3,
                colour: 'rgba(255, 255, 255, 0.2)',
                snap: true
            },
            move: {
                scrollbars: true,
                drag: true,
                wheel: true
            },
            theme: kidSpaceTheme,
            toolboxPosition: "start",
            horizontalLayout: false,
            renderer: 'zelos', // Use the rounded, modern renderer for a kid-friendly look
            // Set the position of the toolbox
            toolboxConfig: {
                position: {
                    top: 60
                }
            }
        });

        workspaceRef.current = workspace;

        // Fix flyout position after initialization
        setTimeout(() => {
            const flyout = document.querySelector('.blocklyFlyout');
            if (flyout) {
                flyout.style.top = '60px';
            }
        }, 100);

        // Add change listener to update code
        workspace.addChangeListener((event) => {
            if (event.type === Blockly.Events.BLOCK_MOVE ||
                event.type === Blockly.Events.BLOCK_CHANGE ||
                event.type === Blockly.Events.BLOCK_CREATE ||
                event.type === Blockly.Events.BLOCK_DELETE) {
                try {
                    const code = Blockly.JavaScript.workspaceToCode(workspace);
                    setCodeString(code);
                } catch (e) {
                    console.log('Error generating code:', e);
                }
            }
        });

        // Custom CSS for kid-friendly styling
        const styleTag = document.createElement('style');
        styleTag.innerHTML = `
            /* Make the blocks more rounded and kid-friendly */
            .blocklyPath {
                filter: drop-shadow(2px 2px 5px rgba(0,0,0,0.3));
            }
            
            /* Make the blocks more rounded */
            .blocklyPathLight, 
            .blocklyPathDark {
                stroke-width: 1 !important;
            }
            
            /* Make the text in blocks larger and more readable */
            .blocklyText {
                font-family: 'Fredoka', 'Comic Sans MS', sans-serif !important;
                font-size: 14px !important;
                fill: white !important;
            }
            
            /* Make the dropdown fields more kid-friendly */
            .blocklyDropdownRect {
                rx: 10px !important;
                ry: 10px !important;
            }
            
            /* Customize toolbox styles to connect directly to top bar */
            .blocklyToolboxDiv {
                background-color: rgba(18, 24, 58, 0.9) !important;
                backdrop-filter: blur(8px) !important;
                color: #ffffff !important;
                width: 240px !important;
                overflow-y: auto !important;
                top: 60px !important; /* Start at the bottom of the top bar */
                height: calc(100% - 60px) !important; /* Height minus top bar */
                box-sizing: border-box !important;
                border: none !important;
                box-shadow: 3px 0 15px rgba(0, 0, 0, 0.3) !important;
                border-radius: 0 !important;
                font-size: 14px !important;
                font-family: 'Fredoka', 'Comic Sans MS', sans-serif !important;
                z-index: 9999 !important; /* Just below the top bar */
            }
            
            /* Make flyout start at the correct position */
            .blocklyFlyout {
                top: 60px !important;
                z-index: 9998 !important;
            }
            
            /* Ensure flyout contents are properly positioned */
            .blocklyFlyoutContent {
                margin-top: 0 !important;
                padding-top: 0 !important;
            }
            
            /* Fix the workspace position */
            .blocklyWorkspace {
                top: 0 !important; 
            }
            
            /* Make toolbox visually connect to top bar */
            .blocklyToolboxDiv::before {
                content: '';
                position: absolute;
                top: -1px; /* Slight overlap to avoid gap */
                left: 0;
                width: 100%;
                height: 1px;
                background-color: rgba(18, 24, 58, 0.9);
                z-index: 10000;
            }
            
            /* Toolbox categories */
            .blocklyTreeRow {
                border-radius: 12px !important;
                margin: 6px 8px !important;
                padding: 8px 12px !important;
                transition: all 0.2s ease !important;
            }
            
            .blocklyTreeRow:hover {
                background-color: rgba(99, 102, 241, 0.2) !important;
                transform: translateX(5px) !important;
            }
            
            .blocklyTreeSelected {
                background-color: rgba(99, 102, 241, 0.3) !important;
            }
            
            /* Make all tree labels white */
            .blocklyTreeLabel {
                font-family: 'Fredoka', 'Comic Sans MS', sans-serif !important;
                font-size: 15px !important;
                font-weight: 500 !important;
                color: white !important;
                fill: white !important;
            }
            
            /* Make the blockly workspace transparent */
            .blocklyMainBackground {
                fill: rgba(10, 10, 41, 0.7) !important;
            }
            
            /* Make the selected blocks pop with a glow */
            .blocklySelected > .blocklyPath {
                filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.5)) !important;
                stroke: #818cf8 !important;
                stroke-width: 3px !important;
            }
            
            /* Connection animation */
            @keyframes pulse {
                0% { opacity: 0.7; transform: scale(0.9); box-shadow: 0 0 5px rgba(255, 255, 255, 0.5); }
                50% { opacity: 1; transform: scale(1.1); box-shadow: 0 0 15px rgba(255, 255, 255, 0.9); }
                100% { opacity: 0.7; transform: scale(0.9); box-shadow: 0 0 5px rgba(255, 255, 255, 0.5); }
            }
            
            /* Make the block field text also white */
            .blocklyEditableText > text {
                fill: white !important;
            }
            
            .blocklyDropdownText {
                fill: white !important;
            }
            
            /* Make sure all text in the workspace is white */
            .blocklyFlyoutLabelText {
                fill: white !important;
            }
            
            .blocklyFlyoutButton > text {
                fill: white !important;
            }
            
            /* Animated background elements */
            @keyframes rotate-galaxy {
                0% { transform: rotate(0deg) scale(1); }
                50% { transform: rotate(180deg) scale(1.1); }
                100% { transform: rotate(360deg) scale(1); }
            }
            
            @keyframes drift-galaxy {
                0% { background-position: 0% 0%; }
                50% { background-position: 20% 10%; }
                100% { background-position: 0% 0%; }
            }
            
            @keyframes twinkle-stars {
                0%, 100% { opacity: 0.7; }
                50% { opacity: 1; }
            }
            
            @keyframes parallax-stars {
                0% { transform: translateY(0) translateX(0); }
                25% { transform: translateY(-5px) translateX(5px); }
                50% { transform: translateY(-10px) translateX(0); }
                75% { transform: translateY(-5px) translateX(-5px); }
                100% { transform: translateY(0) translateX(0); }
            }
            
            @keyframes nebula-glow {
                0% { opacity: 0.5; filter: hue-rotate(0deg); }
                33% { opacity: 0.7; filter: hue-rotate(30deg); }
                66% { opacity: 0.6; filter: hue-rotate(60deg); }
                100% { opacity: 0.5; filter: hue-rotate(0deg); }
            }
            
            /* Background stars that twinkle */
            .twinkling-stars-1 {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                height: 100%;
                background-image: 
                    radial-gradient(white, rgba(255,255,255,.3) 1px, transparent 2px),
                    radial-gradient(white, rgba(255,255,255,.2) 1px, transparent 1px);
                background-size: 300px 300px, 200px 200px;
                background-position: 20px 20px, 50px 50px;
                animation: twinkle-stars 4s infinite alternate;
                z-index: -1;
            }
            
            /* Larger stars with different timing */
            .twinkling-stars-2 {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                height: 100%;
                background-image: 
                    radial-gradient(white, rgba(255,255,255,.4) 2px, transparent 3px),
                    radial-gradient(white, rgba(255,255,255,.3) 1px, transparent 2px);
                background-size: 400px 400px, 300px 300px;
                background-position: 100px 150px, 200px 250px;
                animation: twinkle-stars 6s infinite alternate-reverse;
                z-index: -1;
            }
            
            /* Distant stars with parallax */
            .parallax-stars {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                height: 100%;
                background-image: 
                    radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 2px),
                    radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 1px),
                    radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 2px);
                background-size: 550px 550px, 350px 350px, 250px 250px;
                background-position: 0 0, 40px 60px, 130px 270px;
                animation: parallax-stars 15s infinite ease-in-out;
                z-index: -2;
            }
            
            /* Main galaxy background with rotation */
            .rotating-galaxy-1 {
                position: fixed;
                top: -20%;
                left: -20%;
                width: 140%;
                height: 140%;
                background-image: url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2832&auto=format&fit=crop');
                background-size: cover;
                background-position: center center;
                opacity: 0.8;
                animation: rotate-galaxy 120s infinite linear;
                z-index: -4;
            }
            
            /* Second galaxy layer rotating opposite direction */
            .rotating-galaxy-2 {
                position: fixed;
                top: -30%;
                left: -30%;
                width: 160%;
                height: 160%;
                background-image: url('https://images.unsplash.com/photo-1506703719100-a0b3a494befc?q=80&w=2070&auto=format&fit=crop');
                background-size: cover;
                background-position: center center;
                opacity: 0.3;
                animation: rotate-galaxy 180s infinite linear reverse;
                z-index: -3;
                mix-blend-mode: screen;
            }
            
            /* Colorful nebula overlay */
            .nebula-glow {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: 
                    radial-gradient(circle at 30% 20%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
                    radial-gradient(circle at 80% 40%, rgba(236, 72, 153, 0.2) 0%, transparent 60%),
                    radial-gradient(circle at 10% 70%, rgba(6, 182, 212, 0.2) 0%, transparent 50%);
                animation: nebula-glow 20s infinite ease-in-out;
                mix-blend-mode: screen;
                z-index: -2;
            }
        `;
        document.head.appendChild(styleTag);

        // Resize to ensure proper sizing
        Blockly.svgResize(workspace);

        // Window resize handler
        const handleResize = () => {
            if (workspaceRef.current) {
                Blockly.svgResize(workspaceRef.current);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (styleTag.parentNode) {
                document.head.removeChild(styleTag);
            }
            if (workspaceRef.current) {
                workspaceRef.current.dispose();
            }
        };
    }, [blocklyDivRef]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isKitMenuOpen) setIsKitMenuOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isKitMenuOpen]);

    // Auto-scroll the terminal to the bottom when new text is added
    useEffect(() => {
        const terminal = document.getElementById('terminal-output');
        if (terminal) {
            terminal.scrollTop = terminal.scrollHeight;
        }
    }, [outputText]);

    // Kid-friendly space theme styles

    // Top bar styles
    const topBarStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '60px',
        background: 'rgba(18, 24, 58, 0.9)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 2px 15px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000,
        color: 'white',
        borderBottom: '1px solid rgba(99, 102, 241, 0.3)'
    };

    // Buttons container style
    const buttonContainerStyle = {
        display: 'flex',
        gap: '16px'
    };

    // Base button style with cosmic glow
    const buttonStyle = {
        padding: '10px 20px',
        borderRadius: '50px',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '15px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer',
        boxShadow: '0 0 15px rgba(255, 255, 255, 0.15), inset 0 0 10px rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s',
        fontFamily: "'Fredoka', 'Comic Sans MS', sans-serif"
    };

    // Button styles with kid-friendly space theme colors
    const connectButtonStyle = {
        ...buttonStyle,
        backgroundColor: isConnected ? '#10b981' : '#4f46e5',
        background: isConnected
            ? 'linear-gradient(45deg, #059669, #10b981)'
            : 'linear-gradient(45deg, #4338ca, #6366f1)'
    };

    const uploadButtonStyle = {
        ...buttonStyle,
        background: 'linear-gradient(45deg, #7e22ce, #a855f7)'
    };

    const kitButtonStyle = {
        ...buttonStyle,
        background: 'linear-gradient(45deg, #ea580c, #f97316)'
    };

    // Dropdown styles
    const dropdownStyle = {
        position: 'absolute',
        top: '100%',
        left: '0',
        marginTop: '10px',
        width: '220px',
        background: 'rgba(18, 24, 58, 0.95)',
        backdropFilter: 'blur(8px)',
        borderRadius: '15px',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4), 0 0 15px rgba(99, 102, 241, 0.3)',
        overflow: 'hidden',
        zIndex: 10001,
        border: '2px solid rgba(99, 102, 241, 0.3)',
        padding: '5px'
    };

    const dropdownItemStyle = (isSelected) => ({
        padding: '12px 18px',
        textAlign: 'left',
        width: '100%',
        backgroundColor: isSelected ? 'rgba(99, 102, 241, 0.3)' : 'transparent',
        fontWeight: isSelected ? 'bold' : 'normal',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s',
        borderRadius: '10px',
        margin: '3px 0',
        fontFamily: "'Fredoka', 'Comic Sans MS', sans-serif",
        fontSize: '14px'
    });

    // Right panel screen styles
    const rightPanelStyle = {
        position: 'absolute',
        top: '60px',
        right: '0',
        width: '300px',
        height: 'calc(100% - 60px)',
        backgroundColor: 'rgba(18, 24, 58, 0.85)',
        backdropFilter: 'blur(8px)',
        borderLeft: '1px solid rgba(99, 102, 241, 0.3)',
        boxShadow: '-3px 0 15px rgba(0, 0, 0, 0.3)',
        zIndex: 9998,
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
        fontFamily: "'Fredoka', 'Comic Sans MS', sans-serif",
        overflow: 'hidden'
    };

    const screenHeaderStyle = {
        padding: '10px 15px',
        background: 'rgba(30, 41, 80, 0.95)',
        borderBottom: '1px solid rgba(99, 102, 241, 0.5)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
    };

    // Display type selector tabs
    const displayTabsStyle = {
        display: 'flex',
        borderBottom: '1px solid rgba(99, 102, 241, 0.5)',
        backgroundColor: 'rgba(15, 23, 42, 0.6)'
    };

    const tabStyle = (isActive) => ({
        padding: '10px 15px',
        cursor: 'pointer',
        backgroundColor: isActive ? 'rgba(99, 102, 241, 0.3)' : 'transparent',
        borderBottom: isActive ? '2px solid #818cf8' : 'none',
        color: isActive ? 'white' : 'rgba(255, 255, 255, 0.7)',
        fontWeight: isActive ? 'bold' : 'normal',
        transition: 'all 0.2s',
        flex: 1,
        textAlign: 'center',
        fontSize: '14px'
    });

    // Terminal styles
    const terminalStyle = {
        display: currentDisplay === 'terminal' ? 'block' : 'none',
        height: 'calc(100% - 85px)',
        padding: '15px',
        overflow: 'auto',
        backgroundColor: 'rgba(10, 10, 41, 0.7)',
        color: '#a5f3fc',
        fontFamily: 'monospace',
        fontSize: '14px',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        position: 'relative'
    };

    // Screen scan lines effect
    const scanLinesStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to bottom, rgba(30, 41, 80, 0.1) 50%, rgba(10, 10, 41, 0.1) 50%)',
        backgroundSize: '100% 4px',
        opacity: 0.15,
        pointerEvents: 'none',
        animation: 'scanline 10s linear infinite',
        zIndex: 1
    };

    // Blinking cursor style
    const cursorStyle = {
        display: 'inline-block',
        width: '8px',
        height: '16px',
        backgroundColor: '#a5f3fc',
        marginLeft: '4px',
        animation: 'blink 1s infinite',
        verticalAlign: 'middle'
    };

    // Plot display area
    const plotDisplayStyle = {
        display: currentDisplay === 'plot' ? 'flex' : 'none',
        flexDirection: 'column',
        height: 'calc(100% - 85px)',
        padding: '15px',
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        position: 'relative',
        overflow: 'hidden'
    };

    // Data display area
    const dataDisplayStyle = {
        display: currentDisplay === 'data' ? 'flex' : 'none',
        flexDirection: 'column',
        height: 'calc(100% - 85px)',
        padding: '15px',
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        position: 'relative',
        overflowY: 'auto'
    };

    // Table styles for data display
    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        color: 'white',
        fontSize: '14px'
    };

    const thStyle = {
        backgroundColor: 'rgba(99, 102, 241, 0.3)',
        padding: '10px',
        textAlign: 'left',
        borderBottom: '1px solid rgba(99, 102, 241, 0.5)'
    };

    const tdStyle = {
        padding: '8px 10px',
        borderBottom: '1px solid rgba(99, 102, 241, 0.2)'
    };

    // Grid for plot
    const gridLineStyle = {
        stroke: 'rgba(255, 255, 255, 0.1)',
        strokeWidth: 1
    };

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
            zIndex: 1
        }}>
            {/* Animated Galaxy Background */}
            <div className="rotating-galaxy-1"></div>
            <div className="rotating-galaxy-2"></div>
            <div className="nebula-glow"></div>
            <div className="parallax-stars"></div>
            <div className="twinkling-stars-1"></div>
            <div className="twinkling-stars-2"></div>

            {/* Top Bar with Buttons */}
            <div style={topBarStyle}>
                <div style={buttonContainerStyle}>
                    {/* Connect Button */}
                    <button
                        onClick={handleConnect}
                        style={connectButtonStyle}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'scale(1.08)';
                            e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 255, 255, 0.3), inset 0 0 15px rgba(255, 255, 255, 0.2)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.15), inset 0 0 10px rgba(255, 255, 255, 0.1)';
                        }}
                    >
                        <span style={{
                            width: '15px',
                            height: '15px',
                            borderRadius: '50%',
                            backgroundColor: isConnected ? 'white' : '#a5b4fc',
                            display: 'inline-block',
                            animation: isConnected ? 'pulse 1.5s infinite' : 'none',
                            boxShadow: isConnected ? '0 0 10px rgba(255, 255, 255, 0.7)' : 'none'
                        }}></span>
                        <span>{isConnected ? 'Connected' : 'Connect'}</span>
                    </button>

                    {/* Upload Button */}
                    <button
                        onClick={handleUpload}
                        style={uploadButtonStyle}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'scale(1.08)';
                            e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 255, 255, 0.3), inset 0 0 15px rgba(255, 255, 255, 0.2)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.15), inset 0 0 10px rgba(255, 255, 255, 0.1)';
                        }}
                    >
                        <span>🚀</span>
                        <span>Upload</span>
                    </button>

                    {/* Kit Selection */}
                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsKitMenuOpen(!isKitMenuOpen);
                            }}
                            style={kitButtonStyle}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'scale(1.08)';
                                e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 255, 255, 0.3), inset 0 0 15px rgba(255, 255, 255, 0.2)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.15), inset 0 0 10px rgba(255, 255, 255, 0.1)';
                            }}
                        >
                            <span>🧰</span>
                            <span>{selectedKit}</span>
                            <span style={{
                                transition: 'transform 0.3s',
                                transform: isKitMenuOpen ? 'rotate(180deg)' : 'rotate(0)',
                                display: 'inline-block',
                                marginLeft: '4px'
                            }}>▼</span>
                        </button>

                        {isKitMenuOpen && (
                            <div style={dropdownStyle}>
                                {kits.map(kit => (
                                    <button
                                        key={kit}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            selectKit(kit);
                                        }}
                                        style={dropdownItemStyle(selectedKit === kit)}
                                        onMouseOver={(e) => {
                                            if (selectedKit !== kit) {
                                                e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.2)';
                                                e.currentTarget.style.transform = 'translateX(5px)';
                                            }
                                        }}
                                        onMouseOut={(e) => {
                                            if (selectedKit !== kit) {
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                                e.currentTarget.style.transform = 'translateX(0)';
                                            }
                                        }}
                                    >
                                        {kit}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Panel (Display Screen) */}
            <div style={rightPanelStyle}>
                <div style={screenHeaderStyle}>
                    <span>📊 Display Console</span>
                    <div style={{
                        display: 'flex',
                        gap: '8px'
                    }}>
                        <div style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: '#f87171',
                            cursor: 'pointer'
                        }}></div>
                        <div style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: '#fbbf24',
                            cursor: 'pointer'
                        }}></div>
                        <div style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: '#34d399',
                            cursor: 'pointer'
                        }}></div>
                    </div>
                </div>

                {/* Display Type Tabs */}
                <div style={displayTabsStyle}>
                    <div
                        style={tabStyle(currentDisplay === 'terminal')}
                        onClick={() => setCurrentDisplay('terminal')}
                    >
                        Terminal
                    </div>
                    <div
                        style={tabStyle(currentDisplay === 'plot')}
                        onClick={() => setCurrentDisplay('plot')}
                    >
                        Plot View
                    </div>
                    <div
                        style={tabStyle(currentDisplay === 'data')}
                        onClick={() => setCurrentDisplay('data')}
                    >
                        Data View
                    </div>
                </div>

                {/* Terminal Display */}
                <div
                    id="terminal-output"
                    style={terminalStyle}
                >
                    {outputText}
                    <span style={cursorStyle}></span>
                    <div style={scanLinesStyle}></div>
                </div>

                {/* Plot Display */}
                <div style={plotDisplayStyle}>
                    <div style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        marginBottom: '15px',
                        textAlign: 'center'
                    }}>
                        Sensor Data Visualization
                    </div>

                    {/* Simple SVG Line Chart */}
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <svg width="100%" height="100%" viewBox="0 0 300 200" preserveAspectRatio="none">
                            {/* Grid lines */}
                            {Array.from({ length: 6 }).map((_, i) => (
                                <line
                                    key={`h-${i}`}
                                    x1="0"
                                    y1={40 * i}
                                    x2="300"
                                    y2={40 * i}
                                    style={gridLineStyle}
                                />
                            ))}
                            {Array.from({ length: 7 }).map((_, i) => (
                                <line
                                    key={`v-${i}`}
                                    x1={50 * i}
                                    y1="0"
                                    x2={50 * i}
                                    y2="200"
                                    style={gridLineStyle}
                                />
                            ))}

                            {/* Temperature line */}
                            <polyline
                                points={sensorData.map((d, i) => `${i * (300 / (sensorData.length - 1))},${200 - (d.temp * 4)}`).join(' ')}
                                fill="none"
                                stroke="#ef4444"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            {/* Humidity line */}
                            <polyline
                                points={sensorData.map((d, i) => `${i * (300 / (sensorData.length - 1))},${200 - (d.humidity * 2)}`).join(' ')}
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            {/* Light level line */}
                            <polyline
                                points={sensorData.map((d, i) => `${i * (300 / (sensorData.length - 1))},${200 - (d.light * 0.4)}`).join(' ')}
                                fill="none"
                                stroke="#f59e0b"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            {/* Data points for temperature */}
                            {sensorData.map((d, i) => (
                                <circle
                                    key={`temp-${i}`}
                                    cx={i * (300 / (sensorData.length - 1))}
                                    cy={200 - (d.temp * 4)}
                                    r="4"
                                    fill="#ef4444"
                                    stroke="white"
                                    strokeWidth="1"
                                />
                            ))}
                        </svg>

                        {/* Legend */}
                        <div style={{
                            position: 'absolute',
                            bottom: '10px',
                            right: '10px',
                            backgroundColor: 'rgba(15, 23, 42, 0.7)',
                            padding: '8px',
                            borderRadius: '8px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '5px',
                            fontSize: '12px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <div style={{ width: '12px', height: '3px', backgroundColor: '#ef4444' }}></div>
                                <span>Temperature</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <div style={{ width: '12px', height: '3px', backgroundColor: '#3b82f6' }}></div>
                                <span>Humidity</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <div style={{ width: '12px', height: '3px', backgroundColor: '#f59e0b' }}></div>
                                <span>Light Level</span>
                            </div>
                        </div>
                    </div>

                    <div style={scanLinesStyle}></div>
                </div>

                {/* Data Display */}
                <div style={dataDisplayStyle}>
                    <div style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        marginBottom: '15px',
                        textAlign: 'center'
                    }}>
                        Sensor Data Table
                    </div>

                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={thStyle}>Time</th>
                                <th style={thStyle}>Temp (°C)</th>
                                <th style={thStyle}>Humidity (%)</th>
                                <th style={thStyle}>Light (lux)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sensorData.map((data, index) => (
                                <tr key={index} style={{
                                    backgroundColor: index % 2 === 0 ? 'rgba(15, 23, 42, 0.4)' : 'transparent'
                                }}>
                                    <td style={tdStyle}>{data.time}</td>
                                    <td style={tdStyle}>{data.temp}°C</td>
                                    <td style={tdStyle}>{data.humidity}%</td>
                                    <td style={tdStyle}>{data.light}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div style={scanLinesStyle}></div>
                </div>
            </div>

            {/* Blockly Area - correctly positioned to show the blocks on the left side */}
            <div
                ref={blocklyDivRef}
                style={{
                    position: 'absolute',
                    top: '0px',
                    left: '0px',
                    width: 'calc(100% - 300px)', // Full width minus right panel
                    height: '100%',
                    fontFamily: "'Fredoka', 'Comic Sans MS', sans-serif"
                }}
            ></div>
        </div>
    );
}
