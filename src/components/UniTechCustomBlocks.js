import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

// Define custom blocks
export function defineCustomBlocks() {
    // ============= DISPLAY BLOCKS =============

    // Bar Chart Block
    Blockly.Blocks['display_bar_chart'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("📊 Bar Chart");
            this.appendValueInput("DATA")
                .setCheck("Array")
                .appendField("data");
            this.appendValueInput("LABELS")
                .setCheck("Array")
                .appendField("labels");
            this.appendValueInput("TITLE")
                .setCheck("String")
                .appendField("title");
            this.setInputsInline(false);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(300);
            this.setTooltip("Display data as a bar chart");
        }
    };

    // Histogram Block
    Blockly.Blocks['display_histogram'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("📈 Histogram");
            this.appendValueInput("DATA")
                .setCheck("Array")
                .appendField("data");
            this.appendValueInput("BINS")
                .setCheck("Number")
                .appendField("bins");
            this.appendValueInput("TITLE")
                .setCheck("String")
                .appendField("title");
            this.setInputsInline(false);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(300);
            this.setTooltip("Display data as a histogram");
        }
    };

    // Box Plot Block
    Blockly.Blocks['display_box_plot'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("📦 Box Plot");
            this.appendValueInput("DATA")
                .setCheck("Array")
                .appendField("data");
            this.appendValueInput("TITLE")
                .setCheck("String")
                .appendField("title");
            this.setInputsInline(false);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(300);
            this.setTooltip("Display data as a box plot");
        }
    };

    // Line Chart Block
    Blockly.Blocks['display_line_chart'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("📉 Line Chart");
            this.appendValueInput("X_DATA")
                .setCheck("Array")
                .appendField("x data");
            this.appendValueInput("Y_DATA")
                .setCheck("Array")
                .appendField("y data");
            this.appendValueInput("TITLE")
                .setCheck("String")
                .appendField("title");
            this.setInputsInline(false);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(300);
            this.setTooltip("Display data as a line chart");
        }
    };

    // Scatter Plot Block
    Blockly.Blocks['display_scatter_plot'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("⚪ Scatter Plot");
            this.appendValueInput("X_DATA")
                .setCheck("Array")
                .appendField("x data");
            this.appendValueInput("Y_DATA")
                .setCheck("Array")
                .appendField("y data");
            this.appendValueInput("TITLE")
                .setCheck("String")
                .appendField("title");
            this.setInputsInline(false);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(300);
            this.setTooltip("Display data as a scatter plot");
        }
    };

    // Text Display Block
    Blockly.Blocks['display_text'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("💬 Display Text");
            this.appendValueInput("TEXT")
                .setCheck("String")
                .appendField("text");
            this.appendValueInput("SIZE")
                .setCheck("Number")
                .appendField("size");
            this.appendValueInput("COLOR")
                .setCheck("String")
                .appendField("color");
            this.setInputsInline(false);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(300);
            this.setTooltip("Display text on screen");
        }
    };

    // Clear Display Block
    Blockly.Blocks['display_clear'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("🧹 Clear Display");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(300);
            this.setTooltip("Clear the display screen");
        }
    };

    // ============= EVENT BLOCKS =============

    // Button Click Event
    Blockly.Blocks['event_button_clicked'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("🔴 When")
                .appendField(new Blockly.FieldDropdown([
                    ["red button", "RED"],
                    ["green button", "GREEN"],
                    ["blue button", "BLUE"],
                    ["yellow button", "YELLOW"]
                ]), "BUTTON")
                .appendField("clicked");
            this.appendStatementInput("DO")
                .appendField("do");
            this.setColour(60);
            this.setTooltip("Run code when button is clicked");
        }
    };

    // Sensor Event
    Blockly.Blocks['event_sensor_triggered'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("📡 When")
                .appendField(new Blockly.FieldDropdown([
                    ["temperature sensor", "TEMP"],
                    ["light sensor", "LIGHT"],
                    ["motion sensor", "MOTION"],
                    ["sound sensor", "SOUND"]
                ]), "SENSOR")
                .appendField("detects");
            this.appendValueInput("THRESHOLD")
                .setCheck("Number")
                .appendField("value >");
            this.appendStatementInput("DO")
                .appendField("do");
            this.setColour(60);
            this.setTooltip("Run code when sensor is triggered");
        }
    };

    // Timer Event
    Blockly.Blocks['event_timer'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("⏰ Every");
            this.appendValueInput("INTERVAL")
                .setCheck("Number");
            this.appendDummyInput()
                .appendField(new Blockly.FieldDropdown([
                    ["seconds", "SECONDS"],
                    ["milliseconds", "MILLISECONDS"],
                    ["minutes", "MINUTES"]
                ]), "UNIT");
            this.appendStatementInput("DO")
                .appendField("do");
            this.setColour(60);
            this.setTooltip("Run code at regular intervals");
        }
    };

    // Start Event
    Blockly.Blocks['event_start'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("🚀 When program starts");
            this.appendStatementInput("DO")
                .appendField("do");
            this.setColour(60);
            this.setTooltip("Run code when program starts");
        }
    };

    // Data Received Event
    Blockly.Blocks['event_data_received'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("📨 When data received from")
                .appendField(new Blockly.FieldDropdown([
                    ["serial port", "SERIAL"],
                    ["bluetooth", "BLUETOOTH"],
                    ["WiFi", "WIFI"],
                    ["USB", "USB"]
                ]), "SOURCE");
            this.appendStatementInput("DO")
                .appendField("do");
            this.setColour(60);
            this.setTooltip("Run code when data is received");
        }
    };

    // ============= UNITECH BLOCKS =============

    // LED Control
    Blockly.Blocks['unitech_led'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("💡 LED")
                .appendField(new Blockly.FieldDropdown([
                    ["on", "ON"],
                    ["off", "OFF"],
                    ["toggle", "TOGGLE"]
                ]), "STATE");
            this.appendValueInput("PIN")
                .setCheck("Number")
                .appendField("pin");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(120);
            this.setTooltip("Control LED");
        }
    };

    // Read Sensor
    Blockly.Blocks['unitech_read_sensor'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("📊 Read")
                .appendField(new Blockly.FieldDropdown([
                    ["temperature", "TEMP"],
                    ["humidity", "HUMID"],
                    ["light", "LIGHT"],
                    ["distance", "DISTANCE"]
                ]), "TYPE")
                .appendField("sensor");
            this.appendValueInput("PIN")
                .setCheck("Number")
                .appendField("pin");
            this.setInputsInline(true);
            this.setOutput(true, "Number");
            this.setColour(120);
            this.setTooltip("Read sensor value");
        }
    };

    // Define JavaScript code generators
    javascriptGenerator['display_bar_chart'] = function (block) {
        const data = javascriptGenerator.valueToCode(block, 'DATA', javascriptGenerator.ORDER_ATOMIC) || '[]';
        const labels = javascriptGenerator.valueToCode(block, 'LABELS', javascriptGenerator.ORDER_ATOMIC) || '[]';
        const title = javascriptGenerator.valueToCode(block, 'TITLE', javascriptGenerator.ORDER_ATOMIC) || '""';
        return `displayBarChart(${data}, ${labels}, ${title});\n`;
    };

    javascriptGenerator['display_histogram'] = function (block) {
        const data = javascriptGenerator.valueToCode(block, 'DATA', javascriptGenerator.ORDER_ATOMIC) || '[]';
        const bins = javascriptGenerator.valueToCode(block, 'BINS', javascriptGenerator.ORDER_ATOMIC) || '10';
        const title = javascriptGenerator.valueToCode(block, 'TITLE', javascriptGenerator.ORDER_ATOMIC) || '""';
        return `displayHistogram(${data}, ${bins}, ${title});\n`;
    };

    javascriptGenerator['display_box_plot'] = function (block) {
        const data = javascriptGenerator.valueToCode(block, 'DATA', javascriptGenerator.ORDER_ATOMIC) || '[]';
        const title = javascriptGenerator.valueToCode(block, 'TITLE', javascriptGenerator.ORDER_ATOMIC) || '""';
        return `displayBoxPlot(${data}, ${title});\n`;
    };

    javascriptGenerator['display_line_chart'] = function (block) {
        const xData = javascriptGenerator.valueToCode(block, 'X_DATA', javascriptGenerator.ORDER_ATOMIC) || '[]';
        const yData = javascriptGenerator.valueToCode(block, 'Y_DATA', javascriptGenerator.ORDER_ATOMIC) || '[]';
        const title = javascriptGenerator.valueToCode(block, 'TITLE', javascriptGenerator.ORDER_ATOMIC) || '""';
        return `displayLineChart(${xData}, ${yData}, ${title});\n`;
    };

    javascriptGenerator['display_scatter_plot'] = function (block) {
        const xData = javascriptGenerator.valueToCode(block, 'X_DATA', javascriptGenerator.ORDER_ATOMIC) || '[]';
        const yData = javascriptGenerator.valueToCode(block, 'Y_DATA', javascriptGenerator.ORDER_ATOMIC) || '[]';
        const title = javascriptGenerator.valueToCode(block, 'TITLE', javascriptGenerator.ORDER_ATOMIC) || '""';
        return `displayScatterPlot(${xData}, ${yData}, ${title});\n`;
    };

    javascriptGenerator['display_text'] = function (block) {
        const text = javascriptGenerator.valueToCode(block, 'TEXT', javascriptGenerator.ORDER_ATOMIC) || '""';
        const size = javascriptGenerator.valueToCode(block, 'SIZE', javascriptGenerator.ORDER_ATOMIC) || '16';
        const color = javascriptGenerator.valueToCode(block, 'COLOR', javascriptGenerator.ORDER_ATOMIC) || '"black"';
        return `displayText(${text}, ${size}, ${color});\n`;
    };

    javascriptGenerator['display_clear'] = function (block) {
        return 'clearDisplay();\n';
    };

    javascriptGenerator['event_button_clicked'] = function (block) {
        const button = block.getFieldValue('BUTTON');
        const statements = javascriptGenerator.statementToCode(block, 'DO');
        return `onButtonClick('${button}', function() {\n${statements}});\n`;
    };

    javascriptGenerator['event_sensor_triggered'] = function (block) {
        const sensor = block.getFieldValue('SENSOR');
        const threshold = javascriptGenerator.valueToCode(block, 'THRESHOLD', javascriptGenerator.ORDER_ATOMIC) || '0';
        const statements = javascriptGenerator.statementToCode(block, 'DO');
        return `onSensorTrigger('${sensor}', ${threshold}, function() {\n${statements}});\n`;
    };

    javascriptGenerator['event_timer'] = function (block) {
        const interval = javascriptGenerator.valueToCode(block, 'INTERVAL', javascriptGenerator.ORDER_ATOMIC) || '1';
        const unit = block.getFieldValue('UNIT');
        const statements = javascriptGenerator.statementToCode(block, 'DO');
        return `setInterval(function() {\n${statements}}, ${interval} * ${unit === 'SECONDS' ? '1000' : unit === 'MINUTES' ? '60000' : '1'});\n`;
    };

    javascriptGenerator['event_start'] = function (block) {
        const statements = javascriptGenerator.statementToCode(block, 'DO');
        return `onStart(function() {\n${statements}});\n`;
    };

    javascriptGenerator['event_data_received'] = function (block) {
        const source = block.getFieldValue('SOURCE');
        const statements = javascriptGenerator.statementToCode(block, 'DO');
        return `onDataReceived('${source}', function(data) {\n${statements}});\n`;
    };

    javascriptGenerator['unitech_led'] = function (block) {
        const state = block.getFieldValue('STATE');
        const pin = javascriptGenerator.valueToCode(block, 'PIN', javascriptGenerator.ORDER_ATOMIC) || '0';
        return `controlLED(${pin}, '${state}');\n`;
    };

    javascriptGenerator['unitech_read_sensor'] = function (block) {
        const type = block.getFieldValue('TYPE');
        const pin = javascriptGenerator.valueToCode(block, 'PIN', javascriptGenerator.ORDER_ATOMIC) || '0';
        const code = `readSensor('${type}', ${pin})`;
        return [code, javascriptGenerator.ORDER_ATOMIC];
    };
}

// Define toolbox categories
export const eventsCategory = {
    kind: "category",
    name: "🎯 Events",
    colour: "#FFD700",
    contents: [
        { kind: "block", type: "event_start" },
        { kind: "block", type: "event_button_clicked" },
        { kind: "block", type: "event_sensor_triggered" },
        { kind: "block", type: "event_timer" },
        { kind: "block", type: "event_data_received" }
    ]
};

export const displayCategory = {
    kind: "category",
    name: "📊 Display",
    colour: "#9C27B0",
    contents: [
        { kind: "block", type: "display_bar_chart" },
        { kind: "block", type: "display_histogram" },
        { kind: "block", type: "display_box_plot" },
        { kind: "block", type: "display_line_chart" },
        { kind: "block", type: "display_scatter_plot" },
        { kind: "block", type: "display_text" },
        { kind: "block", type: "display_clear" }
    ]
};

export const unitechCategory = {
    kind: "category",
    name: "🔧 UniTech",
    colour: "#4CAF50",
    contents: [
        { kind: "block", type: "unitech_led" },
        { kind: "block", type: "unitech_read_sensor" }
    ]
};
