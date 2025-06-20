export {}

declare global {
    interface CustomJwtSessionClaims {
        metadata: {
            onboardingComplete?: boolean
            role?: string
            isAdmin?: boolean
            isBetaUser?: boolean
        }
    }
}