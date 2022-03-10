import { IModuleParams } from '@/shared/interface/module-params.interface';
import routes from './routes';

export default function userModule({ router }: IModuleParams): void {
  routes.map((route) => router.addRoute(route));
}
