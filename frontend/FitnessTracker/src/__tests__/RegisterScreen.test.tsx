import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RegisterScreen from '../screens/RegisterScreen';

describe('RegisterScreen Component', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<RegisterScreen />);
    expect(getByPlaceholderText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm Password')).toBeTruthy();
    expect(getByText('Register')).toBeTruthy();
  });

  it('validates input fields', () => {
    const { getByText, getByPlaceholderText } = render(<RegisterScreen />);
    const registerButton = getByText('Register');

    // Attempt to register without filling in fields
    fireEvent.press(registerButton);
    expect(getByText('Please fill in all fields.')).toBeTruthy();

    // Fill in fields but with mismatched passwords
    fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'differentpassword');

    fireEvent.press(registerButton);
    expect(getByText('Passwords do not match.')).toBeTruthy();
  });

  it('calls handleRegister on valid input', () => {
    const { getByText, getByPlaceholderText } = render(<RegisterScreen />);
    const registerButton = getByText('Register');

    // Fill in valid input
    fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'password123');

    // Mock the console.log to test the registration action
    console.log = jest.fn();

    fireEvent.press(registerButton);
    expect(console.log).toHaveBeenCalledWith('Registering with:', {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });
  });
});
