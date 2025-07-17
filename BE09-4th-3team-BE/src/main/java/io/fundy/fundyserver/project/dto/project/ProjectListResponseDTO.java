package io.fundy.fundyserver.project.dto.project;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectListResponseDTO {
    private Long projectNo;
    private String title;
    private String thumbnailUrl;
    private Integer goalAmount;
    private Integer currentAmount;
    private String startLine;
    private String deadLine;
    private String categoryName;
    private String status;
    private String creatorName;
    private int percent;
    private LocalDateTime createdAt;
}
