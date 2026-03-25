import { useEffect, useState } from "react";
import {
  Box,
  Button,
  VStack,
  Card,
  Field,
  Input,
  HStack,
  Stack,
  Center,
  InputGroup,
  IconButton,
  Image,
  Group,
  Switch
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ColorModeButton } from "./ui/color-mode";
import { LocaleSwitcher } from "../utils/LanguageSwitcher";

import { useAuth } from "../AuthProvider";
import { useTranslation } from "react-i18next";

import logo from "/toriLogoApp.svg";

function Login() {
  // requirements
  const { t } = useTranslation();

  // auth
  const { loading, userLogin, authErrorMessage, storageSessionGet, userLogout, storageSessionRemove } = useAuth();

  // resources
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [server, setServer] = useState("");
  const [domain, setDomain] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showDomain, setShowDomain] = useState(false);

  // perform auto relog with getSessionOnStorage ??
  const logInfo = storageSessionGet();

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      await userLogin(email, password, server);
    }
  };

  // Remplir le formulaire avec les valeurs du localStorage
  useEffect(() => {
    if (logInfo) {
      setEmail(logInfo.email);
      setServer(logInfo.server);
    }
  }, []);

  // hide show password
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // hide show domain ldap
  const handleToggleDomain = () => {
    setShowDomain(!showDomain);
  };

  // for debug only
  const submitLogout = async () => {
    await userLogout();
    await storageSessionRemove();
    // refresh window
    window.location.reload();
  };

  return (
    <Box minHeight="100vh" pb="8" bg="bgDefault">
      <Center>
        <Stack gap="4">
          <VStack marginTop="8">
            <Box>
              <Image boxSize="400px" alt="toriphone logo" src={logo} fit="contain" />
            </Box>
          </VStack>
          <Card.Root variant="outline" bg="bgElevated" borderColor="#d8dee4" maxW="408px">
            <Card.Body>
              <HStack justifyContent="space-between" alignItems="top">
                <LocaleSwitcher />
                <ColorModeButton />
              </HStack>
              {authErrorMessage && (
                <Box bg="alertError" color="alertContrast" p="4" borderRadius="6px" textAlign="center" mb="4">
                  {authErrorMessage}
                </Box>
              )}

              <form>
                <Stack gap="4">
                  <Field.Root required>
                    <Field.Label size="lg">{t("login.form_email")}</Field.Label>
                    <Input
                      bg="selectBg"
                      borderColor="selectBorder"
                      size="lg"
                      value={email}
                      onChange={(event) => setEmail(event.currentTarget.value)}
                      onKeyDown={(e) => handleKeyDown(e)}
                    />
                  </Field.Root>
                  <Field.Root required>
                    <HStack justify="space-between">
                      <Field.Label size="lg">{t("login.form_password")}</Field.Label>
                      {/*
                      <Button
                        as="a"
                        href="#"
                        variant="link"
                        size="xs"
                        color="blue.500"
                        fontWeight="500"
                      >
                        {t("login.form_password_forgot")}
                      </Button>
                      */}
                    </HStack>
                    <Group size="lg">
                      <Input
                        type={showPassword ? "text" : "password"}
                        bg="selectBg"
                        borderColor="selectBorder"
                        size="lg"
                        value={password}
                        onChange={(event) => setPassword(event.currentTarget.value)}
                        onKeyDown={(e) => handleKeyDown(e)}
                      />
                      <IconButton variant="ghost" size="lg" p="0" onClick={handleShowPassword}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </IconButton>
                    </Group>
                  </Field.Root>
                  <Field.Root required>
                    <Field.Label size="lg">{t("login.form_server")}</Field.Label>
                    <InputGroup size="lg" startAddon="https://" startAddonProps={{ bg: "selectBg" }}>
                      <Input
                        size="lg"
                        bg="selectBg"
                        borderColor="selectBorder"
                        placeholder={t("login.form_server_placeholder")}
                        value={server}
                        onChange={(event) => setServer(event.currentTarget.value)}
                        onKeyDown={(e) => handleKeyDown(e)}
                      />
                    </InputGroup>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label htmlFor="ldap-switch" mb="2">
                        <Switch.Root id="ldap-switch" onChange={handleToggleDomain} checked={showDomain} colorPalette="cyan">
                          <Switch.HiddenInput />
                          <Switch.Control />
                          <Switch.Label>LDAP</Switch.Label>
                        </Switch.Root>
                    </Field.Label>
                    {showDomain && (
                      <Input id="domain" placeholder="domain" onChange={(e) => setDomain(e.target.value)} />
                    )}
                  </Field.Root>
                    <Button size="lg" colorPalette="secondary" onClick={() => showDomain ? userLogin(email, password, server, {domainName: domain}) : userLogin(email, password, server)} mt="4">
                      {loading ? t("login.form_button_loading") : t("login.form_button")}
                    </Button>
                  {/*
                  <Button onClick={() => submitLogout()}>deco</Button>
                  */}
                </Stack>
              </form>
            </Card.Body>
          </Card.Root>
        </Stack>
      </Center>
    </Box>
  );
}

export default Login;
