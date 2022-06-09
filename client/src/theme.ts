import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";

export const customTheme = extendTheme(
  {
    components: {
      Steps,
    },
  },
  withDefaultColorScheme({ colorScheme: "blue" })
);
