import { Fragment, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import {
    EyeIcon
} from "@heroicons/react/24/solid";
import { ip } from "@/config/config";


export default function ModalArchivoImg({
    archivo,
    url
}) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    return (
        <Fragment>

            <EyeIcon color='#0288d1' className="butlist mt-px h-6 w-6" onClick={handleOpen} />

            <Dialog
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
                size="xl"

            >
                <DialogHeader>Imagen</DialogHeader>
                <DialogBody divider={true} className="h-[45vw] overflow-scroll">

                    <div className="flex justify-center">
                        <img
                            className="h-full w-full rounded-xl"
                            src={`${ip}${url}${archivo}`}
                            alt="Archivos Prestamos"
                        />
                    </div>

                </DialogBody>
                <DialogFooter>

                    <Button
                        variant="gradient"
                        color="red"
                        onClick={handleOpen}
                        className="ml-1"
                    >
                        <span>Cerrar</span>
                    </Button>

                </DialogFooter>
            </Dialog>
        </Fragment>
    );
}

