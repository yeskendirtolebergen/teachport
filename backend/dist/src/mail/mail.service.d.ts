export declare class MailService {
    private transporter;
    constructor();
    sendCredentials(email: string, iin: string, password: string): Promise<void>;
}
