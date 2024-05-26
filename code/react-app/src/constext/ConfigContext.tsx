import { IConfig } from "../config/configData";
import {createContext} from 'react'

export const ConfigContext = createContext<{
    config: IConfig, 
    setConfig: React.Dispatch<React.SetStateAction<IConfig>>
}| null>(null)