import React,{useState} from "react"
import { Outlet, Link } from "react-router-dom"
import { Layout as LayoutAntd, Menu, Button,Popover } from "antd"

const { Header, Content, Footer } = LayoutAntd
const items = [
    {
        label: <Link to={"/"}>Главная</Link>,
        key: "1",
    },
    {
        label: <Link to={"/orders"}>Забронировать</Link>,
        key: "2",
    },
    {
        label:<Link to={"/computer"}>Компьютеры</Link>,
        key: "3",
    }
]
const popoverContent = user => (
    <div>
      {user.isAuthenticated ? (
        <>
          <Link to="/client">
            <Button>Личный кабинет</Button>
          </Link>
          <Link to="/logoff">
            <Button>Выйти</Button>
          </Link>
        </>
      ) : (
        <>
          <Link to="/login">
            <Button>Войти</Button>
          </Link>
          <Link to="/register">
            <Button>Зарегистрироваться</Button>
          </Link>
        </>
      )}
    </div>
  );
const Layout = ({ user }) => {
    const [popoverVisible, setPopoverVisible] = useState(false);
  const handleShowPopover = () => setPopoverVisible(true);
  return (
    <LayoutAntd>
      <Header style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Menu theme="dark" mode="horizontal" items={items} className="menu" />

          <Popover
            content={popoverContent(user)}
            trigger="click"
            visible={popoverVisible}
            onVisibleChange={setPopoverVisible}
          >
            <Button onClick={handleShowPopover}>
              {user.isAuthenticated ? user.userName : 'Гость'}
            </Button>
          </Popover>
        </div>
      </Header>
      <Content className="site-layout" style={{ padding: "0 50px" }}>
        <Outlet />
      </Content>

      <Footer style={{ textAlign: "center" }}>Compclub ©2023</Footer>
    </LayoutAntd>
  );
}
export default Layout