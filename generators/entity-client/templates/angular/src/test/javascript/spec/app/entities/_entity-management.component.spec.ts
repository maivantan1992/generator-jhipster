<%#
 Copyright 2013-2017 the original author or authors from the JHipster project.

 This file is part of the JHipster project, see http://www.jhipster.tech/
 for more information.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-%>
/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiParseLinks, JhiDateUtils, JhiDataUtils, JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MockActivatedRoute, MockRouter } from '../../../helpers/mock-route.service';
import { <%=angularXAppName%>TestModule } from '../../../test.module';
import { Principal, AccountService } from '../../../../../../main/webapp/app/shared';
import { <%= entityAngularName %>Component } from '../../../../../../main/webapp/app/entities/<%= entityFolderName %>/<%= entityFileName %>.component';
import { <%= entityAngularName %>Service } from '../../../../../../main/webapp/app/entities/<%= entityFolderName %>/<%= entityFileName %>.service';
import { <%= entityAngularName %> } from '../../../../../../main/webapp/app/entities/<%= entityFolderName %>/<%= entityFileName %>.model';

describe('Component Tests', () => {

    describe('<%= entityAngularName %> Management Component', () => {
        let comp: <%= entityAngularName %>Component;
        let fixture: ComponentFixture<<%= entityAngularName %>Component>;
        let service: <%= entityAngularName %>Service;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [<%=angularXAppName%>TestModule],
                declarations: [<%= entityAngularName %>Component],
                providers: [
                    {
                        provide: JhiAlertService,
                        useValue: null
                    },
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Router,
                        useValue: new MockRouter()
                    },
                    AccountService,
                    Principal,
                    JhiDataUtils,
                    JhiDateUtils,
                    JhiParseLinks,
                    <%= entityAngularName %>Service,
                    JhiEventManager
                ]
            })
            .overrideTemplate(<%= entityAngularName %>Component, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(<%= entityAngularName %>Component);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(<%= entityAngularName %>Service);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new <%= entityAngularName %>(<%_ if (databaseType === 'sql' || databaseType === 'no') { %>10<% } else if (databaseType === 'mongodb' || databaseType === 'couchbase' || databaseType === 'cassandra') { %>'aaa'<% } %>)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.<%= entityInstancePlural %>[0]).toEqual(jasmine.objectContaining({id: <%
                if (databaseType === 'sql' || databaseType === 'no') { %>10<% } else if (databaseType === 'mongodb' || databaseType === 'couchbase' || databaseType === 'cassandra') { %>'aaa'<% } %>}));
            });
        });
    });

});
