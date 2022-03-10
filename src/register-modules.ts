import { IModuleParams } from "@/shared/interface/module-params.interface";
import purchaseOrderModule from "./modules/purchase-order";
import userModule from "./modules/user";

export default function loadModules(moduleOptions: IModuleParams): void {
    purchaseOrderModule(moduleOptions);
    userModule(moduleOptions);
}