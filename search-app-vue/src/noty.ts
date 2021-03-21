import { ElNotification } from 'element-plus';

const n: any = ElNotification;

const noty = {
    success: (title?: string, message?: string) => n({title, message, type: 'success'}),
    warning: (title?: string, message?: string) => n({title, message, type: 'warning'}),
    error: (title?: string, message?: string) => n({title, message, type: 'error'}),

}


export default noty;