export interface IMailService {
    sendAsync(to: string, from: string, title: string, body: string): Promise<void>;
}