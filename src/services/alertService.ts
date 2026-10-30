import { Alert, AlertInput} from "../types/alertType";

import { AlertRepository } from "../repository/alertRepository";
import { NotificationClient } from "../client/notificationClient";

export class AlertService {
    constructor(
        private repository: AlertRepository
    ) {

    }

    save(alertInput: AlertInput): Alert {
        const existing = this.repository.getByDedupKey(alertInput.dedupKey);
        if(existing) {
            existing.duplicate = true;
            return existing;
        }

        const alert: Alert = {
            incidentId: crypto.randomUUID(),
            serviceId:  alertInput.serviceId,
            severity:   alertInput.severity,          
            title:      alertInput.title,
            dedupKey:   alertInput.dedupKey,
            status: "TRIGGERED",
            notificationStatus : "SKIPPED",
            duplicate: false
        }
        if(alert.severity === 'CRITICAL') {
            // todo call mock service
            const notificationClient = new NotificationClient();
            try {
                const resposne = notificationClient.send(alert);
                if(resposne) {
                    alert.status = 'NOTIFIED';
                    alert.notificationStatus = 'SENT';
                }
            } catch(err) {
                // to do retry mechanism
            }

        }
        return this.repository.save(alert);
    }

    findAll(): Alert[] {
        return this.repository.findAll();
    }
}