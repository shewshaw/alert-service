import { Alert, AlertInput } from "../types/alertType";

export class AlertRepository {
    private alerts = new Map<string,Alert>();
    private dedupKeyMap = new Map<string,string>();

    save(alert: Alert): Alert {
        this.alerts.set(alert.incidentId,alert);
        this.dedupKeyMap.set(alert.dedupKey,alert.incidentId);
        return alert;
    }

    findAll(): Alert[] {
        return [...this.alerts.values()];
    }

    getByDedupKey(dedupKey: string): Alert | undefined {
         const key: string | undefined = this.dedupKeyMap.get(dedupKey);
        if(key === undefined) return undefined
        return this.alerts.get(key);
    }
}