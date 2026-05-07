import { ProviderRepository } from "../provider/provider.repository";
import { ServiceRepository } from "./service.repository";

export class ServiceService {
 
    private readonly serviceRepository = new ServiceRepository();
    private readonly providerRepository = new ProviderRepository();

    
    
}