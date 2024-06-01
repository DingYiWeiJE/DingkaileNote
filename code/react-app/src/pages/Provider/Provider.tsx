import { useEffect, useState } from "react";
import DingkialeProvider from "../../constext/DingkaileContext";
import ProviderList from "./ProviderList";
import ProviderPiece from "./ProviderPiece";

export default function () {
    return <DingkialeProvider>
        <ProviderList/>
    </DingkialeProvider>
}