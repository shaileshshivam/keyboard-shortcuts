import { useState } from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@material-ui/core";
import { Keyboard } from "@material-ui/icons";
import {
  KeyboardShortcut,
  WithShortcutsProp,
  withShortcuts,
} from "./KeyboardShortcut";

const colours = [
  "#ffafbd", // Pinky
  "#9b9b7a", // Olive Drab
  "#6c5b7b", // Dark Lilac
  "#88d8b0", // Aquamarine
  "#ffef96", // Pastel Yellow
  "#a2c8ec", // Powder Blue
  "#a4e4fc", // Baby Blue
  "#ff9566", // Atomic Tangerine
  "#b0a8b9", // Misty Lavender
  "#c2b280", // Sand
  "#0f4c5c", // Prussian Blue
  "#ffeead", // Lemon
  "#95a3a6", // Cadet Grey
  "#f08080", // Light Coral
  "#c3b1e1", // Wisteria
  "#f99157", // Pink-Orange
  "#70a288", // Sage Green
  "#f7cac9", // Melon
  "#b19cd9", // Lilac
  "#f5cd79", // Maize
];

function ShortcutList(props: WithShortcutsProp) {
  return (
    <List style={{ padding: "2rem" }}>
      {props.shortcuts.map(({ keyCombination, description }) => (
        <ListItem key={keyCombination + description}>
          <ListItemIcon>
            <Keyboard />
          </ListItemIcon>
          <ListItemText
            primary={description}
            secondary={<span>{keyCombination}</span>}
          />
        </ListItem>
      ))}
    </List>
  );
}

export function TestComponent() {
  const [fontSize, setFontSize] = useState(2);
  const [isLightMode, setIsLightMode] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#ff9566");

  function incrementFontSize() {
    setFontSize((prevFontSize) => {
      if (prevFontSize < 4) {
        return prevFontSize + 0.5;
      }

      return prevFontSize;
    });
  }

  function decrementFontSize() {
    setFontSize((prevFontSize) => {
      if (prevFontSize > 2) {
        return prevFontSize - 0.5;
      }
      return prevFontSize;
    });
  }

  function toggleDarkMode() {
    setIsLightMode((isLightMode) => !isLightMode);
  }

  function changeBackgroundColour() {
    setBackgroundColor(colours[Math.floor(Math.random() * colours.length)]);
  }

  return (
    <Grid container spacing={0} style={{ height: "100vh" }}>
      <Grid
        item
        xs={6}
        style={{
          fontSize: `${fontSize}rem`,
          padding: "1rem",
          width: "50%",
          height: "50%",
          backgroundColor: "red",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper>Keyboard Shortcut Library</Paper>
        <KeyboardShortcut
          description="Increase font size"
          keyCombination="shift i"
          onKeyPress={incrementFontSize}
        />
        <KeyboardShortcut
          description="Decrease font size"
          keyCombination="shift d"
          onKeyPress={decrementFontSize}
        />
      </Grid>
      <Grid
        item
        xs={6}
        style={{
          width: "50vw",
          height: "50vh",
          backgroundColor: isLightMode ? "#fafafa" : "#000000",
        }}
      >
        <KeyboardShortcut
          description="Toggle dark/light mode"
          keyCombination="ctrl b"
          onKeyPress={toggleDarkMode}
        />
      </Grid>
      <Grid
        item
        xs={6}
        style={{ width: "50vw", height: "50vh", backgroundColor }}
      >
        <KeyboardShortcut
          description="Toggle dark/light mode"
          keyCombination="ctrl r"
          onKeyPress={changeBackgroundColour}
        />
      </Grid>
      <Grid
        item
        xs={6}
        style={{ width: "50vw", height: "50vh", backgroundColor: "#ffffff" }}
      >
        {withShortcuts(ShortcutList)({})}
      </Grid>
    </Grid>
  );
}
