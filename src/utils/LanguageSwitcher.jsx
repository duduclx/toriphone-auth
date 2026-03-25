import { useTranslation } from "react-i18next";
import { Flex, Box, NativeSelect } from "@chakra-ui/react";

export const LocaleSwitcher = () => {
  const { i18n } = useTranslation();

  const locales = [
    { value: "en", label: "English", lc: "GB" },
    { value: "fr", label: "Français", lc: "FR" },
    { value: "es", label: "Español", lc: "ES" },
    { value: "it", label: "Italiano", lc: "IT" },
    { value: "de", label: "Deutsch", lc: "DE" },
  ];

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <Flex align="center" flex={1} mb="4">
      <Box width="100%">
        <NativeSelect.Root size="lg">
          <NativeSelect.Field
            bg="selectBg"
            borderColor="selectBorder"
            css={{
              "& > option": {
                background: "selectBg",
                padding: "0.5rem",
              },
              "& > option:hover": {
                background: "selectHover",
              },
            }}
            value={i18n.resolvedLanguage}
            onChange={handleChange}
          >
            {locales.map((locale) => (
              <option key={locale.value} value={locale.value}>
                {locale.label}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Box>
    </Flex>
  );
};
