import React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { auth } from '@/lib/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router';


const Auth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [credential, setCredential] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();

    const validateForm = (isRegistration = false) => {
        setError('');

        const { email, password, confirmPassword } = credential;

        if (!email || !password) {
            setError('Please fill in all fields.');
            return false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address.');
            return false;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return false;
        }

        if (isRegistration && password !== confirmPassword) {
            setError('Passwords do not match.');
            return false;
        }

        return true;
    };

    const handleInputChange = ({ target: { name, value } }) => {
        setCredential((prev) => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleSubmit = async (e, isRegister) => {
        e.preventDefault();

        if (!validateForm(isRegister)) return;

        setIsLoading(true);
        setError('');

        try {
            const authFn = isRegister
                ? createUserWithEmailAndPassword
                : signInWithEmailAndPassword;
            await authFn(auth, credential.email, credential.password);
            navigate('/create-trip');
        } catch ({ message }) {
            setError(message.replace('Firebase: ', ''));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-slate-500 to-slate-700 p-4">
            
            <Card className="w-full max-w-md mx-4 rounded-lg shadow-lg bg-white">
                <CardHeader className="space-y-1 p-4">
                    <CardTitle className="text-2xl font-bold text-center text-gray-800">Welcome</CardTitle>
                    <CardDescription className="text-center text-gray-600">
                        Sign in to your account or create a new one.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-4">
                            <TabsTrigger value="login" className="p-2 text-center">Login</TabsTrigger>
                            <TabsTrigger value="register" className="p-2 text-center">Register</TabsTrigger>
                        </TabsList>

                        <TabsContent value="login">
                            <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
                                <InputField
                                    id="email-login"
                                    label="Email"
                                    type="email"
                                    name="email"
                                    value={credential.email}
                                    onChange={handleInputChange}
                                    isLoading={isLoading}
                                />
                                <InputField
                                    id="password-login"
                                    label="Password"
                                    type="password"
                                    name="password"
                                    value={credential.password}
                                    onChange={handleInputChange}
                                    isLoading={isLoading}
                                />
                                <SubmitButton isLoading={isLoading} text="Sign In" loadingText="Signing in..." />
                            </form>
                        </TabsContent>

                        <TabsContent value="register">
                            <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-4">
                                <InputField
                                    id="email-register"
                                    label="Email"
                                    type="email"
                                    name="email"
                                    value={credential.email}
                                    onChange={handleInputChange}
                                    isLoading={isLoading}
                                />
                                <InputField
                                    id="password-register"
                                    label="Password"
                                    type="password"
                                    name="password"
                                    value={credential.password}
                                    onChange={handleInputChange}
                                    isLoading={isLoading}
                                />
                                <InputField
                                    id="confirm-password"
                                    label="Confirm Password"
                                    type="password"
                                    name="confirmPassword"
                                    value={credential.confirmPassword}
                                    onChange={handleInputChange}
                                    isLoading={isLoading}
                                />
                                <SubmitButton isLoading={isLoading} text="Create Account" loadingText="Creating account..." />
                            </form>
                        </TabsContent>
                    </Tabs>

                    {error && (
                        <Alert variant="destructive" className="mt-4">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

const InputField = ({ id, label, type, name, value, onChange, isLoading }) => (
    <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Input
            id={id}
            name={name}
            type={type}
            placeholder={label}
            value={value}
            onChange={onChange}
            disabled={isLoading}
        />
    </div>
);

const SubmitButton = ({ isLoading, text, loadingText }) => (
    <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
            <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {loadingText}
            </>
        ) : (
            text
        )}
    </Button>
);

export default Auth;
