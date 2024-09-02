import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useAppBridge } from "@shopify/app-bridge-react";
import {
  Badge,
  Box,
  Card,
  Divider,
  InlineStack,
  Layout,
  Page,
  Spinner,
  Text,
} from "@shopify/polaris";

export default function HomePage() {
  const [summary, setSummary] = useState({ products: 0, collections: 0 });

  const shopify = useAppBridge();

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const response = await fetch("/api/status");

      return await response.json();
    },
  });

  useEffect(() => {
    if (!isLoading && data) setSummary(data);
  }, [isLoading, data]);

  useEffect(() => {
    shopify.loading(isLoading);
  }, [isLoading]);

  return (
    <Page title="Integration status" narrowWidth>
      <Layout>
        <Layout.Section>
          <Card padding="0">
            <Box padding="300">
              <InlineStack align="space-between">
                <Text as="p" variant="headingMd">
                  Products
                </Text>
                <InlineStack gap="200">
                  <Text>{summary.products}</Text>
                  {isLoading ? (
                    <Spinner size="small" />
                  ) : (
                    <Badge progress="complete" size="small" tone="success">
                      Done
                    </Badge>
                  )}
                </InlineStack>
              </InlineStack>
            </Box>
            <Divider />
            <Box padding="300">
              <InlineStack align="space-between">
                <Text as="p" variant="headingMd">
                  Customers
                </Text>
                <InlineStack gap="200">
                  <Text>0</Text>
                  {isLoading ? (
                    <Spinner size="small" />
                  ) : (
                    <Badge progress="complete" size="small" tone="success">
                      Done
                    </Badge>
                  )}
                </InlineStack>
              </InlineStack>
            </Box>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
