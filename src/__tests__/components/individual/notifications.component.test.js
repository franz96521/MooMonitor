import notifyMe from '../../../components/individual/notifications.component';

describe('notifyMe', () => {
    beforeEach(() => {
        // Mock the Notification API
        global.Notification = {
            permission: 'granted',
            requestPermission: jest.fn(),
            constructor: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should request permission if permission is not granted', () => {
        global.Notification.permission = 'default';
        notifyMe('Test Title', 'Test Description');
        expect(Notification.requestPermission).toHaveBeenCalled();
    });

    it('should not create a notification if permission is denied', () => {
        global.Notification.permission = 'denied';
        notifyMe('Test Title', 'Test Description');
        expect(Notification.constructor).not.toHaveBeenCalled();
    });
});
