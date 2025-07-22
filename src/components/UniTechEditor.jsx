import { useEffect, useRef } from "react";
import * as Blockly from "blockly/core";
import "blockly/blocks";
import "blockly/javascript";
import "blockly/python";
import * as En from "blockly/msg/en";
// ✅ Import custom blocks and toolbox categories
import {
    defineCustomBlocks,
    unitechCategory,
    eventsCategory,
    displayCategory
} from "./UniTechCustomBlocks";
// Set Blockly language
Blockly.setLocale(En);
export default function UniTechEditor() {
    const workspaceRef = useRef(null);
    useEffect(() => {
        // ✅ Register all custom blocks before injecting
        defineCustomBlocks();
        // ✅ Define the full toolbox
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
        // ✅ Inject Blockly into div
        const workspace = Blockly.inject("blocklyDiv", {
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
            theme: Blockly.Themes.Modern
        });
        workspaceRef.current = workspace;
        Blockly.svgResize(workspace);
        return () => {
            workspace.dispose();
        };
    }, []);
    return (
        <div className="h-screen w-screen bg-gradient-to-br from-cyan-50 to-pink-50">
            {/* Top Header Bar */}
            <div className="h-12 bg-white flex items-center px-4 font-bold text-lg shadow z-10">
                🌌 UniTech Editor
            </div>
            {/* Blockly Area */}
            <div
                id="blocklyDiv"
                className="w-full"
                style={{
                    height: "calc(100vh - 48px)", // minus header
                    fontFamily: "'Fredoka', sans-serif"
                }}
            ></div>
        </div>
    );
}