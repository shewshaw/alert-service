export interface AlertInput {
    "serviceId":  string;
    "severity":   string;            
    "title":      string;
    "dedupKey":   string;
}

export interface Alert {
    incidentId: string;
    serviceId:  string;
    severity:   string;            
    title:      string;
    dedupKey:   string;
    status: string;
    notificationStatus : string;
    duplicate: boolean;
}