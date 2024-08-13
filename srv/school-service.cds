using {school as sh} from '../db/school-data-model';

service school_service {

    entity Students as projection on sh.Student;
    entity Parent as projection on sh.Parent;
    entity Teacher as projection on sh.Teacher;

}
