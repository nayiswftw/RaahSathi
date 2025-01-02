import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { auth } from '@/lib/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router';

const AUTH_FIELDS = {
  login: ['email', 'password'],
  register: ['email', 'password', 'confirmPassword']
};

const InputField = ({ label, ...props }) => (
  <div className="space-y-2">
    <Label className="text-sm font-medium">{label}</Label>
    <Input className="h-10 px-3" placeholder={`Enter your ${label.toLowerCase()}`} {...props} />
  </div>
);

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [credentials, setCredentials] = useState({
    email: '', password: '', confirmPassword: ''
  });
  const navigate = useNavigate();

  const validateForm = (type) => {
    const { email, password, confirmPassword } = credentials;
    if (!email || !password) return 'Please fill in all fields.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email address.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    if (type === 'register' && password !== confirmPassword) return 'Passwords do not match.';
    return null;
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    const error = validateForm(type);
    if (error) return setError(error);

    setIsLoading(true);
    setError('');

    try {
      const authFn = type === 'register' ? createUserWithEmailAndPassword : signInWithEmailAndPassword;
      await authFn(auth, credentials.email, credentials.password);
      navigate('/create-trip');
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-500 to-slate-700 p-4 flex items-center justify-center">
      <Card className="w-full max-w-md mx-auto shadow-xl">
        <CardHeader className="space-y-1 p-6">
          <CardTitle className="text-2xl md:text-3xl font-bold text-center">Welcome back</CardTitle>
          <CardDescription className="text-center text-sm md:text-base">
            Sign in to your account or create a new one
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="text-sm md:text-base">Login</TabsTrigger>
              <TabsTrigger value="register" className="text-sm md:text-base">Register</TabsTrigger>
            </TabsList>

            {['login', 'register'].map(type => (
              <TabsContent key={type} value={type}>
                <form onSubmit={(e) => handleSubmit(e, type)} className="space-y-4">
                  {AUTH_FIELDS[type].map(field => (
                    <InputField
                      key={field}
                      type={field.includes('password') ? 'password' : 'email'}
                      name={field}
                      label={field.charAt(0).toUpperCase() + field.slice(1).replace('password', ' Password')}
                      value={credentials[field]}
                      onChange={e => setCredentials(prev => ({ ...prev, [field]: e.target.value }))}
                      disabled={isLoading}
                    />
                  ))}
                  <Button 
                    type="submit" 
                    className="w-full h-11 font-medium transition-colors"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {type === 'login' ? 'Signing in...' : 'Creating account...'}
                      </>
                    ) : (
                      type === 'login' ? 'Sign in' : 'Create account'
                    )}
                  </Button>
                </form>
              </TabsContent>
            ))}
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

export default Auth;