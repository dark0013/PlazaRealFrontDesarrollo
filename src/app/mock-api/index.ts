import { inject, Injectable } from '@angular/core';
import { HelpCenterMockApi } from 'app/mock-api/apps/help-center/api';
import { NotesMockApi } from 'app/mock-api/apps/notes/api';
import { ScrumboardMockApi } from 'app/mock-api/apps/scrumboard/api';
import { AuthMockApi } from 'app/mock-api/common/auth/api';
import { MessagesMockApi } from 'app/mock-api/common/messages/api';
import { NavigationMockApi } from 'app/mock-api/common/navigation/api';
import { NotificationsMockApi } from 'app/mock-api/common/notifications/api';
import { ShortcutsMockApi } from 'app/mock-api/common/shortcuts/api';
import { UserMockApi } from 'app/mock-api/common/user/api';
import { AnalyticsMockApi } from 'app/mock-api/dashboards/analytics/api';
import { CryptoMockApi } from 'app/mock-api/dashboards/crypto/api';
import { FinanceMockApi } from 'app/mock-api/dashboards/finance/api';
import { ProjectMockApi } from 'app/mock-api/dashboards/project/api';
import { ActivitiesMockApi } from 'app/mock-api/pages/activities/api';
import { IconsMockApi } from 'app/mock-api/ui/icons/api';

@Injectable({ providedIn: 'root' })
export class MockApiService {
    activitiesMockApi = inject(ActivitiesMockApi);
    analyticsMockApi = inject(AnalyticsMockApi);
    authMockApi = inject(AuthMockApi);
    cryptoMockApi = inject(CryptoMockApi);
    financeMockApi = inject(FinanceMockApi);
    helpCenterMockApi = inject(HelpCenterMockApi);
    iconsMockApi = inject(IconsMockApi);
    messagesMockApi = inject(MessagesMockApi); 
    navigationMockApi = inject(NavigationMockApi);
    notesMockApi = inject(NotesMockApi);
    notificationsMockApi = inject(NotificationsMockApi);
    projectMockApi = inject(ProjectMockApi);
    scrumboardMockApi = inject(ScrumboardMockApi);
    shortcutsMockApi = inject(ShortcutsMockApi);
    userMockApi = inject(UserMockApi);
}
