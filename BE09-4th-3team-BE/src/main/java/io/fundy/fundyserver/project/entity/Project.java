package io.fundy.fundyserver.project.entity;

import io.fundy.fundyserver.project.dto.project.ProjectRequestDTO;
import io.fundy.fundyserver.register.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "projects")
@Getter
// admin에서 추가
@Setter
//
@NoArgsConstructor
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectNo; // 프로젝트 고유 ID

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // 등록한 창작자 (회원)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_no", nullable = false)
    private Category category; // 카테고리

    @Column(nullable = false, length = 100)
    private String title; // 프로젝트 제목

    @Lob
    @Column(nullable = false, columnDefinition = "LONGTEXT")
    private String description; // 상세 설명

    @Column(name = "account_number", nullable = false, length = 50)
    private String accountNumber; // 입금 계좌번호

    @Column(name = "goal_amount", nullable = false)
    private Integer goalAmount; // 목표 금액

    @Column(name = "current_amount", nullable = false)
    private Integer currentAmount = 0; // 현재 후원 금액

    @Column(name = "start_line", nullable = false)
    private LocalDate startLine; // 시작일

    @Column(name = "dead_line", nullable = false)
    private LocalDate deadLine; // 마감일

    @Enumerated(EnumType.STRING)
    @Column(name = "product_status", nullable = false, length = 30)
    private ProjectStatus productStatus = ProjectStatus.WAITING_APPROVAL; // 프로젝트 상태

    @Column(name = "thumbnail_url", length = 255)
    private String thumbnailUrl; // 썸네일 이미지 URL

    @Column(name = "view_count", nullable = false)
    private Integer viewCount = 0; // 조회수

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now(); // 생성일

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now(); // 수정일

    @Column(name = "creator_name", nullable = false)
    private String creatorName;

    @Column(name = "creator_info", nullable = false)
    private String creatorInfo;

    @PrePersist
    protected void onCreate() {
        createdAt = updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reward> rewards = new ArrayList<>();

    public void addReward(Reward reward) {
        rewards.add(reward);
        reward.setProject(this);
    }

    public static Project create(User user, Category category, ProjectRequestDTO dto) {
        Project project = new Project();
        project.user = user;
        project.category = category;
        project.title = dto.getTitle();
        project.description = dto.getDescription();
        project.accountNumber = dto.getAccountNumber();
        project.goalAmount = dto.getGoalAmount();
        project.currentAmount = 0;
        project.startLine = dto.getStartLine();
        project.deadLine = dto.getDeadLine();
        project.productStatus = ProjectStatus.WAITING_APPROVAL;
        project.viewCount = 0;
        project.createdAt = LocalDateTime.now();
        project.updatedAt = LocalDateTime.now();
        project.creatorName = dto.getCreatorName();
        project.creatorInfo = dto.getCreatorInfo();
        project.thumbnailUrl = dto.getThumbnailUrl();

        return project;
    }



}


