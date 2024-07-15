import { Container } from "inversify";
import { AuthService, EventService, UserService } from "./services";
import { TYPES } from "./constants";
import { AuthMiddleware } from "./middlewares";
import { RegisterEventService } from "./services/registerEvent.service";

const container=new Container()
container.bind<AuthService>(TYPES.AuthService).to(AuthService)
container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware);
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<EventService>(TYPES.EventService).to(EventService);
container.bind<RegisterEventService>(TYPES.RegisterEventService).to(RegisterEventService);
export default container