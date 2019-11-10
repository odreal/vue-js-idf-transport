import FormatedDate from '@/models/formatedDate';
export default interface Step {
    id: number;
    from: string;
    to: string;
    mode: string;
    code: string;
    direction: string;
    hStart: FormatedDate;
    hArrive: FormatedDate;
}
