import { login, logout } from '../../actions/auth';

test('should generate login action object correctly', () => {
    const result = login('uid');
    expect(result).toEqual({
        type: 'LOGIN',
        uid: 'uid'
    });
});

test('should generate logout action object correctly', () => {
    const result = logout();
    expect(result).toEqual({
        type: 'LOGOUT'
    });
});