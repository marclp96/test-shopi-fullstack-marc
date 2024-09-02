import { useEffect, useState } from "react";
import {
  Button,
  Card,
  FormLayout,
  Icon,
  Layout,
  Page,
  TextField,
} from "@shopify/polaris";
import { ViewIcon, HideIcon } from "@shopify/polaris-icons";
import { useQuery } from "react-query";
import { useAppBridge, SaveBar } from "@shopify/app-bridge-react";

export default function ERPSettings() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    ip: "",
    port: "",
    user: "",
    password: "",
  });
  const [copyCredentials, setCopyCredentials] = useState({ ...credentials });

  const shopify = useAppBridge();

  // Authenticated request to the backend to obtain the credentials
  const { isLoading, data } = useQuery({
    queryFn: async () => {
      // /erp segment in url determine what kind of settings to retrieve
      const response = await fetch("/api/settings/erp");

      return await response.json();
    },
  });

  useEffect(() => {
    shopify.loading(isLoading);

    if (!isLoading && data) {
      setCredentials(data);
      setCopyCredentials(data);
    }
  }, [isLoading, data]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    shopify.loading(loading);
  }, [loading]);

  useEffect(() => {
    if (!credentials || !copyCredentials) return;

    if (JSON.stringify(credentials) !== JSON.stringify(copyCredentials))
      // Show the save bar if there are changes in the credentials
      shopify.saveBar.show("save-changes");
    // Hide the save bar if there are not changes in the credentials
    else shopify.saveBar.hide("save-changes");
  }, [credentials, copyCredentials]);

  const changeCredentials = (change) =>
    setCredentials((prev) => ({ ...prev, ...change }));

  // Request to the backend to update the credentials
  const handleSaveCredentials = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "erp", ...credentials }),
      });

      if (response.ok) {
        shopify.toast.show("ERP credentials updated");

        const credentialsUpdated = await response.json();

        setCredentials(credentialsUpdated);
        setCopyCredentials(credentialsUpdated);
      } else {
        shopify.toast.show("Something went wrong", { isError: true });
      }
    } catch (error) {
      console.log(error);

      shopify.toast.show("Something went wrong", { isError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page title="ERP settings" narrowWidth>
      <SaveBar id="save-changes">
        <button
          loading={loading ? "true" : undefined}
          variant="primary"
          onClick={handleSaveCredentials}
        ></button>
        <button
          disabled={loading ? "true" : undefined}
          onClick={() => setCredentials(copyCredentials)}
        ></button>
      </SaveBar>
      <Layout>
        <Layout.Section>
          <Card>
            <FormLayout data-save-bar>
              <FormLayout.Group>
                <TextField
                  label="IP"
                  value={credentials.ip}
                  onChange={(value) => changeCredentials({ ip: value })}
                  onClearButtonClick={() => changeCredentials({ ip: "" })}
                  clearButton
                  disabled={loading}
                />
                <TextField
                  label="Port"
                  value={credentials.port}
                  onChange={(value) => changeCredentials({ port: value })}
                  onClearButtonClick={() => changeCredentials({ port: "" })}
                  clearButton
                  disabled={loading}
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <TextField
                  label="User"
                  value={credentials.user}
                  onChange={(value) => changeCredentials({ user: value })}
                  onClearButtonClick={() => changeCredentials({ user: "" })}
                  clearButton
                  disabled={loading}
                />
                <TextField
                  label="Password"
                  value={credentials.password}
                  onChange={(value) => changeCredentials({ password: value })}
                  onClearButtonClick={() => changeCredentials({ password: "" })}
                  clearButton
                  disabled={loading}
                  type={showPassword ? "text" : "password"}
                  connectedRight={
                    <Button
                      disabled={loading}
                      onClick={() => setShowPassword(!showPassword)}
                      icon={
                        <Icon source={showPassword ? HideIcon : ViewIcon} />
                      }
                    />
                  }
                />
              </FormLayout.Group>
            </FormLayout>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
