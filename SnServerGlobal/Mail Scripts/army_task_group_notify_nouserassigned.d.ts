declare namespace Task_Assignment_Reporter {
}
declare namespace Daily_Unassigned_Group_Task_Notification {
    interface ITaskCountsSource {
        typeDisplayName: string;
        count: number;
        vipCount: number;
        oldestUpdate: {
            dateTime: GlideDateTime;
            sys_id: string;
        };
        oldestCreate: {
            dateTime: GlideDateTime;
            sys_id: string;
        };
    }
}
declare namespace army_task_group_notify_nouserassigned {
    interface IEventData {
        typeDisplayName: string;
        count: number;
        vipCount: number;
        oldestUpdate: {
            dateTime: string;
            sys_id: string;
        };
        oldestCreate: {
            dateTime: string;
            sys_id: string;
        };
    }
}
