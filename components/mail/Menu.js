import React from "react";
import {
  Card,
  CardBody,
  Typography,
  Alert,
  Button,
  Select,
  Option,
  Input,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import { toast } from "react-toastify";

const Menu = ({ vistas, entrada, salida }) => {
  const [open, setOpen] = React.useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <>
      <Button onClick={openDrawer}>Menu</Button>
      <Drawer open={open} onClose={closeDrawer} className="p-4 bg-gray-200">
        <Card className="">
          <List>
            <ListItem
              onClick={() => {
                vistas("R");
                closeDrawer();
              }}
            >
              Redactar Mensaje
            </ListItem>
            <ListItem
              onClick={() => {
                vistas("B");
                closeDrawer();
              }}
            >
              Bandeja de Entrada
              <ListItemSuffix>
                <Chip
                  value={entrada.length}
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>
            <ListItem
              onClick={() => {
                vistas("E");
                closeDrawer();
              }}
            >
              Enviados
              <ListItemSuffix>
                <Chip
                  value={salida.length}
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>
          </List>
        </Card>
      </Drawer>
    </>
  );
};

export default Menu;
