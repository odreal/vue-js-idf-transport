import Step from '@/models/step';
import FormatedDate from '@/models/formatedDate';

export default interface Journey {
    id: number;
    order: number;
    hStart: FormatedDate;
    hArrive: FormatedDate;
    c02: number;
    duration: number;
    step: Step[];
}
