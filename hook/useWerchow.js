import { useContext } from "react";
import WerchowContext from "../context/WerchowProvider";

const useWerchow = () => {
    return useContext(WerchowContext);
};

export default useWerchow;