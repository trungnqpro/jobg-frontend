import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { User, UserService } from '../../shared';
import { UserModalService } from './user-modal.service';

@Component({
    selector: 'jobg-user-mgmt-delete-dialog',
    templateUrl: './user-management-delete-dialog.component.html'
})
export class UserMgmtDeleteDialogComponent {

    user: User;

    constructor(
        private userService: UserService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(login) {
        this.userService.delete(login).subscribe((response) => {
            this.eventManager.broadcast({ name: 'userListModification',
                content: 'Deleted a user'});
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jobg-user-delete-dialog',
    template: ''
})
export class UserDeleteDialogComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userModalService: UserModalService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.userModalService.open(UserMgmtDeleteDialogComponent as Component, params['login']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}