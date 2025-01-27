import { supabaseClient } from "./supabase"

export const getTrips = async ({ userId, token }) => {
    if (!userId || !token) {
        throw new Error('Missing required parameters')
    }

    const supabase = await supabaseClient(token)
    const { data, error } = await supabase
        .from('trips')
        .select('*')
        .eq('user_id', userId)

    if (error) {
        console.error('Supabase error:', error)
        throw new Error(error.message)
    }

    return data
}

export const addTrips = async ({ userId, token, data }) => {
    if (!userId || !token || !data) {
        throw new Error('Missing required parameters')
    }

    const supabase = await supabaseClient(token)
    const { data: responseData, error } = await supabase
        .from('trips')
        .insert(
            {
                "user_id": userId,
                "trip_data": data,
            }
        )
        .select()

    if (error) {
        console.error('Supabase error:', error)
        throw new Error(error.message)
    }

    return responseData
}

export const removeTrip = async ({ userId, token, tripId }) => {
    if (!userId || !token || !tripId) {
        throw new Error('Missing required parameters')
    }

    const supabase = await supabaseClient(token)
    const { data, error } = await supabase
        .from('trips')
        .delete()
        .eq('id', tripId)
        .eq('user_id', userId)

    if (error) {
        console.error('Supabase error:', error)
        throw new Error(error.message)
    }

    return data
}