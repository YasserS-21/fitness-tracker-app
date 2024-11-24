import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '../screens/LoginScreen';

describe('LoginScreen Component', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);
    expect(getByPlaceholderText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
  });

  it('updates username and password fields', () => {
    const { getByPlaceholderText } = render(<LoginScreen />);
    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(usernameInput, 'testuser');
    fireEvent.changeText(passwordInput, 'password123');

    expect(usernameInput.props.value).toBe('testuser');
    expect(passwordInput.props.value).toBe('password123');
  });
})
