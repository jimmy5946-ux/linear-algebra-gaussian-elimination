#include <stdio.h>

int main() {
    int n;
    double a[10][11];

    scanf("%d", &n);

    for (int i = 0; i < n; i++)
        for (int j = 0; j <= n; j++)
            scanf("%lf", &a[i][j]);

    for (int i = 0; i < n; i++) {
        double p = a[i][i];

        for (int j = 0; j <= n; j++)
            a[i][j] /= p;

        for (int k = 0; k < n; k++) {
            if (k == i) continue;

            double m = a[k][i];

            for (int j = 0; j <= n; j++)
                a[k][j] -= m * a[i][j];
        }
    }

    for (int i = 0; i < n; i++)
        printf("x%d = %.2f\n", i + 1, a[i][n]);

    return 0;
}