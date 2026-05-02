from models import Example

EXAMPLES = [
    Example(
        id="fake_upi",
        label="Fake UPI Alert",
        text="Your UPI is blocked. Verify at http://upi-verify-now.com"
    ),
    Example(
        id="prize_scam",
        label="Prize Scam",
        text="You won Rs 1,00,000! Share OTP to claim your prize."
    ),
    Example(
        id="phishing_url",
        label="Phishing URL",
        text="KYC pending. Update now: http://sbi-kyc-portal.xyz"
    )
]
