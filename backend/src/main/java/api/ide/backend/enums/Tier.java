package api.ide.backend.enums;

public enum Tier {
    BRONZE(0, 5),
    SILVER(6, 100),
    GOLD(100, 250),
    PLATINUM(250, Integer.MAX_VALUE);

    private final int minPoints;
    private final int maxPoints;

    Tier(int minPoints, int maxPoints) {
        this.minPoints = minPoints;
        this.maxPoints = maxPoints;
    }

    public static Tier getTierByPoints(int points) {
        for (Tier tier : values()) {
            if (points >= tier.minPoints && points < tier.maxPoints) {
                return tier;
            }
        }
        return BRONZE;
    }
}
