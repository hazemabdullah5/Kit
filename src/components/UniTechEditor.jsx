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
    };

    // Upload button handler
    const handleUpload = () => {
        if (!isConnected) {
            alert("Please connect to a device first!");
            return;
        }
        alert("Uploading code to device...");
    };

    // Kit selection handler
    const selectKit = (kit) => {
        setSelectedKit(kit);
        setIsKitMenuOpen(false);
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

        // Inject Blockly with specific configuration to make toolbox fill the left side
        const workspace = Blockly.inject(blocklyDivRef.current, {
            toolbox: toolbox,
            trashcan: true,
            zoom: {
                controls: true,
                wheel: true,
                startScale: 1.0
            },
            grid: {
                spacing: 20,
                length: 3,
                colour: "#ccc",
                snap: true
            },
            move: {
                scrollbars: true,
                drag: true,
                wheel: true
            },
            theme: Blockly.Themes.Modern,
            toolboxPosition: "start", // 'start' means left in LTR languages
            horizontalLayout: false    // vertical toolbox
        });

        workspaceRef.current = workspace;

        // Customize toolbox styles to fill the left side
        const toolboxDiv = document.querySelector('.blocklyToolboxDiv');
        if (toolboxDiv) {
            toolboxDiv.style.backgroundColor = '#f8f9fa';
            toolboxDiv.style.width = '240px';
            toolboxDiv.style.overflowY = 'auto';
            toolboxDiv.style.top = '60px'; // Leave space for the top bar
            toolboxDiv.style.height = 'calc(100% - 60px)'; // Fill remaining height
        }

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

    // Top bar styles
    const topBarStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '60px',
        backgroundColor: '#f8f9ff',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000
    };

    // Buttons container style
    const buttonContainerStyle = {
        display: 'flex',
        gap: '16px'
    };

    // Base button style
    const buttonStyle = {
        padding: '8px 16px',
        borderRadius: '50px',
        border: 'none',
        color: 'white',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.2s, box-shadow 0.2s',
    };

    // Button styles
    const connectButtonStyle = {
        ...buttonStyle,
        backgroundColor: isConnected ? '#22c55e' : '#3b82f6',
    };

    const uploadButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#8b5cf6',
    };

    const kitButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#f97316',
    };

    // Dropdown styles
    const dropdownStyle = {
        position: 'absolute',
        top: '100%',
        left: '0',
        marginTop: '8px',
        width: '200px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
        overflow: 'hidden',
        zIndex: 10001
    };

    const dropdownItemStyle = (isSelected) => ({
        padding: '10px 16px',
        textAlign: 'left',
        width: '100%',
        backgroundColor: isSelected ? '#fff7ed' : 'transparent',
        fontWeight: isSelected ? 'bold' : 'normal',
        color: isSelected ? '#ea580c' : '#333',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    });

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
            backgroundColor: '#ffffff'
        }}>
            {/* Top Bar with Buttons */}
            <div style={topBarStyle}>
                <div style={buttonContainerStyle}>
                    {/* Connect Button */}
                    <button
                        onClick={handleConnect}
                        style={connectButtonStyle}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.15)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
                        }}
                    >
                        <span style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: isConnected ? 'white' : '#e5e7eb',
                            display: 'inline-block',
                            animation: isConnected ? 'pulse 1.5s infinite' : 'none'
                        }}></span>
                        <span>{isConnected ? 'Connected' : 'Connect'}</span>
                    </button>

                    {/* Upload Button */}
                    <button
                        onClick={handleUpload}
                        style={uploadButtonStyle}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.15)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
                        }}
                    >
                        <span>📤</span>
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
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.15)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
                            }}
                        >
                            <span>🧰</span>
                            <span>{selectedKit}</span>
                            <span style={{
                                transition: 'transform 0.2s',
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
                                                e.currentTarget.style.backgroundColor = '#fff7ed';
                                            }
                                        }}
                                        onMouseOut={(e) => {
                                            if (selectedKit !== kit) {
                                                e.currentTarget.style.backgroundColor = 'transparent';
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

            {/* Blockly Area - Adjusted to account for top bar */}
            <div
                ref={blocklyDivRef}
                style={{
                    position: 'absolute',
                    top: '60px', // Below the top bar
                    left: 0,
                    width: '100%',
                    height: 'calc(100% - 60px)', // Remaining height
                    fontFamily: "'Fredoka', sans-serif"
                }}
            ></div>

            {/* Add some styles for the connection indicator animation */}
            <style>
                {`
                @keyframes pulse {
                    0% { opacity: 0.6; transform: scale(0.95); }
                    50% { opacity: 1; transform: scale(1.05); }
                    100% { opacity: 0.6; transform: scale(0.95); }
                }
                `}
            </style>
        </div>
    );
}
