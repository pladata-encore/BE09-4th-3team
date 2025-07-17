package io.fundy.fundyserver.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NotificationResponseDTO {
    private Long notificationNo;
    private Long projectNo;
    private String projectName;
    private String type;
    private String message;
    private Boolean isRead;
    private LocalDateTime createdAt;
    private String creatorName;
    private String projectThumbnailUrl;
}