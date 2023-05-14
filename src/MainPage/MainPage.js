import React from "react";
import { Layout, Typography } from "antd";

const { Content } = Layout;
const { Title } = Typography;

const HomePage = () => {
  return (
    <Layout>

        <Title style={{ color: "#000" }}>Computer Club</Title>

      <Content style={{ padding: "50px" }}>
        <Title level={2}>Welcome to Computer Club!</Title>
        <p>
          We offer a comfortable and productive workspace equipped with modern
          computers and high-speed internet connection.
        </p>
        <p>
          Our club is a great place to study, work, and socialize with other
          computer enthusiasts.
        </p>
      </Content>
    </Layout>
  );
};

export default HomePage;
