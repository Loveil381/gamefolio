/**
 * Represents the subject of a contact message.
 */
export enum ContactSubject {
    JOB_OPPORTUNITY = 'Job Opportunity',
    COLLABORATION = 'Collaboration',
    GAME_FEEDBACK = 'Game Feedback',
    OTHER = 'Other'
}

/**
 * Represents the data submitted in the contact form.
 */
export interface ContactFormData {
    /** The name of the sender */
    name: string;
    /** The email address of the sender */
    email: string;
    /** The subject of the message */
    subject: ContactSubject;
    /** The content of the message */
    message: string;
}
