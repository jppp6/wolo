export namespace Team {
    export class Create {
        static readonly type = '[Team] Create';
    }

    export class GetAll {
        static readonly type = '[Team] Get All';
    }

    export class GetOne {
        static readonly type = '[Team] Get One';
        constructor(public teamId: string) {}
    }

    export class Update {
        static readonly type = '[Team] Update';
    }

    export class Delete {
        static readonly type = '[Team] Delete';
    }
}
