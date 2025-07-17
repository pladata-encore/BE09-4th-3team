package io.fundy.fundyserver.pledge.entity;

import io.fundy.fundyserver.project.entity.Project;
import io.fundy.fundyserver.project.entity.Reward;
import io.fundy.fundyserver.register.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pledges")
@Getter
@NoArgsConstructor
public class Pledge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pledgeNo; // 후원 ID

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // 후원자 정보

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_no", nullable = false)
    private Project project; // 후원한 프로젝트

    @OneToMany(mappedBy = "pledge", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PledgeReward> pledgeRewards = new ArrayList<>(); // 선택한 리워드 목록

    @Column(name = "additional_amount")
    private Integer additionalAmount = 0; // 추가 후원금

    @Column(name = "total_amount", nullable = false)
    private Integer totalAmount; // 총 후원금액 (리워드 금액 + 추가 후원금)

    @Column(name = "delivery_address", nullable = false)
    private String deliveryAddress; // 배송지 주소

    @Column(name = "delivery_phone", nullable = false)
    private String deliveryPhone; // 배송 연락처

    @Column(name = "recipient_name", nullable = false)
    private String recipientName; // 수령인 이름

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now(); // 후원 시간

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // 리워드 추가 메서드
    public void addReward(Reward reward, Integer quantity) {
        PledgeReward pledgeReward = PledgeReward.create(this, reward, quantity);
        this.pledgeRewards.add(pledgeReward);
    }

    // 총 금액 계산 메서드
    public void calculateTotalAmount() {
        int rewardsTotal = this.pledgeRewards.stream()
                .mapToInt(pr -> pr.getRewardAmount() * pr.getQuantity())
                .sum();
        this.totalAmount = rewardsTotal + (this.additionalAmount != null ? this.additionalAmount : 0);
    }

    public static Pledge create(User user, Project project, Integer additionalAmount, 
                               String deliveryAddress, String deliveryPhone, String recipientName) {
        Pledge pledge = new Pledge();
        pledge.user = user;
        pledge.project = project;
        pledge.additionalAmount = additionalAmount != null ? additionalAmount : 0;
        pledge.deliveryAddress = deliveryAddress;
        pledge.deliveryPhone = deliveryPhone;
        pledge.recipientName = recipientName;
        return pledge;
    }
}
